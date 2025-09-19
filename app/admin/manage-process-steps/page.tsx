"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useDisclosure } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { createClient } from "@/lib/supabase/client";

type Step = {
  id: string;
  title: string;
  icon: string | null;
  href: string | null;
  sort_order: number;
};

type Service = {
  id: string;
  name: string;
  sort_order: number;
  step_id: string;
};

export default function ManageProcessSteps() {
  const supabase = useMemo(() => createClient(), []);
  const [steps, setSteps] = useState<Step[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Step | null>(null);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const servicesModal = useDisclosure();

  const [form, setForm] = useState<Omit<Step, "id">>({
    title: "",
    icon: "",
    href: "",
    sort_order: 0,
  });

  useEffect(() => {
    (async () => {
      await fetchAll();
      setLoading(false);
    })();
  }, []);

  async function fetchAll() {
    const { data: stepRows } = await supabase
      .from("process_steps")
      .select("*")
      .order("sort_order", { ascending: true });
    setSteps((stepRows as Step[]) || []);

    const { data: serviceRows } = await supabase
      .from("process_step_services")
      .select("*")
      .order("sort_order", { ascending: true });
    setServices((serviceRows as Service[]) || []);
  }

  function openAdd() {
    setEditing(null);
    setForm({ title: "", icon: "", href: "", sort_order: steps.length });
    onOpen();
  }

  function openEdit(step: Step) {
    setEditing(step);
    const { id, ...rest } = step;
    setForm(rest);
    onOpen();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from("process_steps")
          .update(form)
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("process_steps").insert([form]);
        if (error) throw error;
      }
      await fetchAll();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this step and its services?")) return;
    const { error } = await supabase
      .from("process_steps")
      .delete()
      .eq("id", id);
    if (error) {
      console.error(error);
      alert("Failed to delete");
    }
    await fetchAll();
  }

  function openServices(step: Step) {
    setSelectedStep(step);
    servicesModal.onOpen();
  }

  async function addService(name: string) {
    if (!selectedStep) return;
    const { error } = await supabase
      .from("process_step_services")
      .insert([
        {
          name,
          step_id: selectedStep.id,
          sort_order: services.filter((s) => s.step_id === selectedStep.id)
            .length,
        },
      ]);
    if (error) console.error(error);
    await fetchAll();
  }

  async function deleteService(id: string) {
    const { error } = await supabase
      .from("process_step_services")
      .delete()
      .eq("id", id);
    if (error) console.error(error);
    await fetchAll();
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Process Steps</h1>
          <p className="text-default-500">
            Manage the 6-step manufacturing process and its bullet points
          </p>
        </div>
        <Button color="primary" onPress={openAdd}>
          Add Step
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Spinner size="lg" />
        </div>
      ) : (
        <Table aria-label="Process Steps">
          <TableHeader>
            <TableColumn className="w-[40px]">#</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Icon</TableColumn>
            <TableColumn>Href</TableColumn>
            <TableColumn className="w-[260px]">Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No steps yet" items={steps}>
            {steps.map((step, idx) => (
              <TableRow key={step.id}>
                <TableCell>{step.sort_order ?? idx}</TableCell>
                <TableCell>{step.title}</TableCell>
                <TableCell>{step.icon || "-"}</TableCell>
                <TableCell className="truncate max-w-xs">
                  {step.href || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => openServices(step)}
                    >
                      Services
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => openEdit(step)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={() => handleDelete(step.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Create/Edit Step */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>{editing ? "Edit Step" : "Add Step"}</ModalHeader>
            <ModalBody className="gap-4">
              <Input
                isRequired
                label="Title"
                placeholder="Enter title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
              />
              <Input
                label="Icon"
                placeholder="e.g. consultation, design, fabric"
                value={form.icon ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, icon: e.target.value }))
                }
              />
              <Input
                label="Href"
                placeholder="e.g. /process/consultation"
                value={form.href ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, href: e.target.value }))
                }
              />
              <Input
                label="Sort Order"
                type="number"
                value={String(form.sort_order ?? 0)}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" isLoading={saving} type="submit">
                {editing ? "Save Changes" : "Create"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Services Modal */}
      <Modal
        isOpen={servicesModal.isOpen}
        onClose={servicesModal.onClose}
        size="lg"
      >
        <ModalContent>
          <ModalHeader>Services for: {selectedStep?.title}</ModalHeader>
          <ModalBody>
            <div className="space-y-3">
              {(
                services.filter((s) => s.step_id === selectedStep?.id) || []
              ).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-2 border rounded-md p-2"
                >
                  <span>{s.name}</span>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => deleteService(s.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex gap-2">
              <Input
                className="flex-1"
                label="New Service"
                placeholder="Service bullet text"
                id="new-service-input"
              />
              <Button
                color="primary"
                onPress={() => {
                  const input = document.getElementById(
                    "new-service-input"
                  ) as HTMLInputElement | null;
                  const val = input?.value?.trim();
                  if (val) {
                    addService(val);
                    if (input) input.value = "";
                  }
                }}
              >
                Add
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
