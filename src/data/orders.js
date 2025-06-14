const sampleOrders = [
  {
    id: 10001,
    status: "Delivered",
    createdAt: "2025-06-13T10:12:00.000Z",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      address: "123 Main St",
      zip: "600001",
      paymentMethod: "card",
    },
    items: [
      { name: "Classic Frame", qty: 1, price: 1499 },
      { name: "Lens Cleaner", qty: 2, price: 299 },
    ],
  },
   {
    id: 10003,
    status: "Delivered",
    createdAt: "2025-06-13T10:12:00.000Z",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      address: "123 Main St",
      zip: "600001",
      paymentMethod: "card",
    },
    items: [
      { name: "Classic Frame", qty: 1, price: 1499 },
      { name: "Lens Cleaner", qty: 2, price: 299 },
    ],
  },
];
export default sampleOrders;
