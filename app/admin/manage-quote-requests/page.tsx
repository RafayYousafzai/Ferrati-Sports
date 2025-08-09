"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Divider } from "@heroui/divider";
import { Spacer } from "@heroui/spacer";
import {
  Search,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  Calendar,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type QuoteRequest = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message?: string | null;
  status: string | null;
  created_at: string | null;
};

type QuoteItem = {
  id: string;
  quote_id: string;
  product_id: string;
  quantity: number;
  price: number | null;
};

type Product = {
  id: string;
  title: string;
};

type ComposedQuote = QuoteRequest & {
  items: Array<
    QuoteItem & {
      product?: Product | null;
      line_total: number;
    }
  >;
  total_price: number;
};

const supabase = createClient();

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const [
        { data: quotesData, error: qErr },
        { data: itemsData, error: iErr },
        { data: productsData, error: pErr },
      ] = await Promise.all([
        supabase
          .from("requested_quotes")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("quote_items").select("*"),
        supabase.from("products").select("id,title"),
      ]);

      if (qErr) throw qErr;
      if (iErr) throw iErr;
      if (pErr) throw pErr;

      setQuotes(quotesData || []);
      setItems(itemsData || []);
      setProducts(productsData || []);
    } catch (err: any) {
      console.error("Fetch error", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  const composedQuotes = useMemo((): ComposedQuote[] => {
    return quotes.map((q) => {
      const qItems = items
        .filter((it) => it.quote_id === q.id)
        .map((it) => {
          const prod = products.find((p) => p.id === it.product_id) || null;
          const price = it.price ?? 0;

          return {
            ...it,
            product: prod,
            line_total: Number(price) * (it.quantity || 0),
          };
        });
      const total = qItems.reduce((s, it) => s + it.line_total, 0);

      return {
        ...q,
        items: qItems,
        total_price: total,
      };
    });
  }, [quotes, items, products]);

  const filtered = useMemo(() => {
    return composedQuotes.filter((q) => {
      if (filter !== "all" && q.status !== filter) return false;
      if (!search) return true;
      const s = search.toLowerCase();

      return (
        (q.name || "").toLowerCase().includes(s) ||
        (q.email || "").toLowerCase().includes(s) ||
        q.items.some((it) =>
          (it.product?.title || "").toLowerCase().includes(s)
        )
      );
    });
  }, [composedQuotes, filter, search]);

  async function updateStatus(quoteId: string, status: string) {
    setUpdating((s) => ({ ...s, [quoteId]: true }));
    try {
      const { error } = await supabase
        .from("requested_quotes")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", quoteId);

      if (error) throw error;
      await fetchAll();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setUpdating((s) => ({ ...s, [quoteId]: false }));
    }
  }

  async function deleteQuote(quoteId: string) {
    if (!confirm("Delete this quote? This will remove quote items as well."))
      return;
    setDeleting((s) => ({ ...s, [quoteId]: true }));
    try {
      const { error } = await supabase
        .from("requested_quotes")
        .delete()
        .eq("id", quoteId);

      if (error) throw error;
      await fetchAll();
    } catch (err) {
      console.error(err);
      alert("Failed to delete quote");
    } finally {
      setDeleting((s) => ({ ...s, [quoteId]: false }));
    }
  }

  function toggleExpand(id: string) {
    setExpanded((s) => ({ ...s, [id]: !s[id] }));
  }

  function exportCSV(quotesToExport: ComposedQuote[]) {
    const rows = [
      [
        "Quote ID",
        "Name",
        "Email",
        "Phone",
        "Status",
        "Created At",
        "Total Price",
        "Items JSON",
      ],
    ];

    for (const q of quotesToExport) {
      rows.push([
        q.id,
        q.name ?? "",
        q.email ?? "",
        q.phone ?? "",
        q.status ?? "",
        q.created_at
          ? format(new Date(q.created_at), "yyyy-MM-dd HH:mm:ss")
          : "",
        q.total_price.toFixed(2),
        JSON.stringify(
          q.items.map((it) => ({
            product_id: it.product_id,
            product_title: it.product?.title ?? null,
            quantity: it.quantity,
            price: it.price,
            line_total: it.line_total,
          }))
        ),
      ]);
    }
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `quotes_export_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      case "completed":
        return "primary";
      default:
        return "warning";
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
        <Spacer y={4} />
        <p className="text-gray-600">Loading quotes...</p>
      </div>
    );
  }

  return (
    <div className="p-6 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Requested Quotes</h1>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            className="w-64"
            placeholder="Search name, email or product..."
            startContent={<Search className="h-4 w-4 text-gray-400" />}
            value={search}
            variant="flat"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            className="w-40"
            placeholder="Filter by status"
            selectedKeys={[filter]}
            variant="flat"
            onSelectionChange={(keys) =>
              setFilter(Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="all">All</SelectItem>
            <SelectItem key="pending">Pending</SelectItem>
            <SelectItem key="approved">Approved</SelectItem>
            <SelectItem key="rejected">Rejected</SelectItem>
            <SelectItem key="completed">Completed</SelectItem>
          </Select>
          <Button
            color="primary"
            startContent={<Download className="h-4 w-4" />}
            onClick={() => exportCSV(filtered)}
          >
            Export CSV
          </Button>
          <Button
            isIconOnly
            title="Refresh"
            variant="flat"
            onClick={() => fetchAll()}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && (
        <Card className="mb-4">
          <CardBody>
            <p className="text-danger">Error: {error}</p>
          </CardBody>
        </Card>
      )}

      {filtered.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-gray-600 text-lg">No quotes found.</p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((q) => (
            <Card key={q.id} className="shadow-none bg-slate-50 p-3">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          {q.name ?? "—"}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {q.email ?? "—"}
                        </p>
                        {q.phone && (
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {q.phone}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {q.created_at
                            ? format(
                                new Date(q.created_at),
                                "MMM dd, yyyy HH:mm"
                              )
                            : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Chip
                        color={getStatusColor(q.status)}
                        size="sm"
                        variant="flat"
                      >
                        {q.status ?? "pending"}
                      </Chip>
                      <Chip size="sm" variant="flat">
                        Total: ${q.total_price.toFixed(2)}
                      </Chip>
                      <Chip size="sm" variant="flat">
                        {q.items.length} items
                      </Chip>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      startContent={
                        expanded[q.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )
                      }
                      variant="flat"
                      onClick={() => toggleExpand(q.id)}
                    >
                      {expanded[q.id] ? "Hide" : "View"}
                    </Button>
                    <Select
                      className="w-32 va"
                      isDisabled={!!updating[q.id]}
                      selectedKeys={[q.status ?? "Pending"]}
                      size="sm"
                      variant="flat"
                      onSelectionChange={(keys) => {
                        const newStatus = Array.from(keys)[0] as string;

                        updateStatus(q.id, newStatus);
                      }}
                    >
                      <SelectItem key="pending">Pending</SelectItem>
                      <SelectItem key="approved">Approved</SelectItem>
                      <SelectItem key="rejected">Rejected</SelectItem>
                      <SelectItem key="completed">Completed</SelectItem>
                    </Select>
                    <Button
                      isIconOnly
                      color="danger"
                      isLoading={!!deleting[q.id]}
                      size="sm"
                      variant="flat"
                      onClick={() => deleteQuote(q.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expanded[q.id] && (
                <CardBody className="pt-0">
                  <Divider className="mb-4" />

                  {q.message && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Message:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {q.message}
                      </p>
                    </div>
                  )}

                  <div className="mb-2">
                    <h4 className="font-medium">Quote Items:</h4>
                  </div>

                  {!q.cart_items || q.cart_items.length === 0 ? (
                    <p className="text-sm text-gray-500 py-4">
                      No items recorded for this quote.
                    </p>
                  ) : (
                    <Table removeWrapper aria-label="Quote items">
                      <TableHeader>
                        <TableColumn>PRODUCT</TableColumn>
                        <TableColumn align="center">QUANTITY</TableColumn>
                        <TableColumn align="end">UNIT PRICE</TableColumn>
                        <TableColumn align="end">LINE TOTAL</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {q.cart_items.map((it: any, index: any) => {
                          const price = it.product?.price ?? 0;
                          const quantity = it.quantity ?? 0;
                          const lineTotal = price * quantity;

                          return (
                            <TableRow key={it.product?.id || index}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {it.product?.title ?? "(unknown product)"}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    ID: {it.product?.id}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-center">{quantity}</div>
                              </TableCell>
                              <TableCell>
                                <div className="text-right">
                                  ${price.toFixed(2)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-right font-medium">
                                  ${lineTotal.toFixed(2)}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}

                  <Divider className="my-4" />
                  <div className="flex justify-end">
                    <Chip color="success" size="lg" variant="flat">
                      Total: ${q.total_price.toFixed(2)}
                    </Chip>
                  </div>
                </CardBody>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
