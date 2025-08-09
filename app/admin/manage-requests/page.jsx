"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ContactRequestsAdmin() {
  const supabase = createClient();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data);
    }
    setLoading(false);
  }

  async function deleteRequest(id) {
    if (!confirm("Are you sure you want to delete this request?")) return;

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>📬 Contact Requests</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No contact requests found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Interest</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone || "—"}</td>
                <td>{req.interest || "—"}</td>
                <td>{new Date(req.created_at).toLocaleString()}</td>
                <td>
                  <button
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteRequest(req.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
