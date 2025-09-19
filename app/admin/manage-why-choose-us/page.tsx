"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useDisclosure } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { Select, SelectItem } from "@heroui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { createClient } from "@/lib/supabase/client";

type Item = {
  id: string;
  title: string;
  description: string;
  icon: "building" | "store" | "settings" | "lightbulb";
  sort_order: number;
  created_at?: string;
};

const ICON_OPTIONS: Item["icon"][] = [
  "building",
  "store",
  "settings",
  "lightbulb",
];

export default function ManageWhyChooseUs() {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState<Omit<Item, "id">>({
    title: "",
    description: "",
    icon: "building",
    sort_order: 0,
  });

  useEffect(() => {
    (async () => {
      await fetchItems();
      setLoading(false);
    })();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase
      .from("why_choose_us")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) console.error(error);
    setItems((data as Item[]) || []);
  }

  function openAdd() {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      icon: "building",
      sort_order: items.length,
    });
    onOpen();
  }

  function openEdit(item: Item) {
    setEditing(item);
    const { id, created_at, ...rest } = item;
    setForm(rest);
    onOpen();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from("why_choose_us")
          .update(form)
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("why_choose_us").insert([form]);
        if (error) throw error;
      }
      await fetchItems();
      onClose();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save. Check console for details.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this card?")) return;
    const { error } = await supabase
      .from("why_choose_us")
      .delete()
      .eq("id", id);
    if (error) {
      console.error(error);
      alert("Failed to delete");
    }
    await fetchItems();
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Why Choose Us</h1>
          <p className="text-default-500">Manage the 4 highlight cards</p>
        </div>
        <Button color="primary" onPress={openAdd}>
          Add Card
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Spinner size="lg" />
        </div>
      ) : (
        <Table aria-label="Why Choose Us table">
          <TableHeader>
            <TableColumn className="w-[40px]">#</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Icon</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn className="w-[180px]">Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No items yet" items={items}>
            {items.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{item.sort_order ?? idx}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="capitalize">{item.icon}</TableCell>
                <TableCell className="truncate max-w-md">
                  {item.description}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => openEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={() => handleDelete(item.id)}
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

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>{editing ? "Edit Card" : "Add Card"}</ModalHeader>
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
              <Textarea
                isRequired
                label="Description"
                placeholder="Enter description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
              <Select
                disallowEmptySelection
                label="Icon"
                selectedKeys={[form.icon]}
                onSelectionChange={(keys) =>
                  setForm((f) => ({
                    ...f,
                    icon: Array.from(keys)[0] as Item["icon"],
                  }))
                }
              >
                {ICON_OPTIONS.map((v) => (
                  <SelectItem key={v} value={v} className="capitalize">
                    {v}
                  </SelectItem>
                ))}
              </Select>
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
    </div>
  );
}
