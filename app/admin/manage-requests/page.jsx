"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Filter,
  MailCheck,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { Textarea } from "@heroui/input";

export default function ContactRequestsAdmin() {
  const supabase = createClient();

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.interest?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, statusFilter]);

  async function fetchRequests() {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  }

  async function deleteRequest(id) {
    const { error } = await supabase
      .from("contact_requests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting request:", error);
    } else {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  }

  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from("contact_requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    }
  }

  function viewRequest(request) {
    setSelectedRequest(request);
    onOpen();
  }

  function getStatusColor(status) {
    switch (status) {
      case "new":
        return "primary";
      case "contacted":
        return "warning";
      case "completed":
        return "success";
      default:
        return "default";
    }
  }

  return (
    <div className="p-6 max-w-full">
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-none shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MailCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Contact Requests
              </h1>
              <p className="text-gray-600">
                Manage and respond to customer inquiries
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Input
              placeholder="Search by name, email, or interest..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              className="max-w-md"
              variant="bordered"
            />
            <div className="flex gap-2 items-center">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    startContent={<Filter className="w-4 h-4" />}
                  >
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectedKeys={[statusFilter]}
                  onSelectionChange={(keys) =>
                    setStatusFilter(Array.from(keys)[0])
                  }
                >
                  <DropdownItem key="all">All Requests</DropdownItem>
                  <DropdownItem key="new">New</DropdownItem>
                  <DropdownItem key="contacted">Contacted</DropdownItem>
                  <DropdownItem key="completed">Completed</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button color="primary" onPress={fetchRequests}>
                Refresh
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow-none border-none">
        <CardBody className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Spinner size="lg" color="primary" />
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No contact requests found</p>
              <p className="text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <Table
              aria-label="Contact requests table"
              className="min-h-[400px]"
            >
              <TableHeader>
                <TableColumn>CONTACT INFO</TableColumn>
                <TableColumn>DETAILS</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-gray-800">
                          {req.name}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          {req.email}
                        </div>
                        {req.phone && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            {req.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs capitalize">
                        {req.interest && (
                          <p className=" text-gray-500 truncate mt-1 max-w-[200px]">
                            {req.interest}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Chip
                            color={getStatusColor(req.status || "new")}
                            variant="solid"
                            className="cursor-pointer capitalize text-white"
                          >
                            {req.status || "new"}
                          </Chip>
                        </DropdownTrigger>
                        <DropdownMenu
                          onAction={(key) => updateStatus(req.id, key)}
                        >
                          <DropdownItem key="new">New</DropdownItem>
                          <DropdownItem key="contacted">Contacted</DropdownItem>
                          <DropdownItem key="completed">Completed</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {new Date(req.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => viewRequest(req)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this request?"
                              )
                            ) {
                              deleteRequest(req.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">Contact Request Details</h3>
            <p className="text-sm text-gray-500">
              Submitted on{" "}
              {selectedRequest &&
                new Date(selectedRequest.created_at).toLocaleString()}
            </p>
          </ModalHeader>
          <ModalBody>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <Input
                      value={selectedRequest.name}
                      isReadOnly
                      variant="bordered"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      value={selectedRequest.email}
                      isReadOnly
                      variant="bordered"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <Input
                      value={selectedRequest.phone || "Not provided"}
                      isReadOnly
                      variant="bordered"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Interest
                    </label>
                    <Input
                      value={selectedRequest.interest || "General"}
                      isReadOnly
                      variant="bordered"
                    />
                  </div>
                </div>
                {selectedRequest.message && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <Textarea
                      value={selectedRequest.message}
                      isReadOnly
                      variant="bordered"
                      minRows={3}
                    />
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Mark as Contacted
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
