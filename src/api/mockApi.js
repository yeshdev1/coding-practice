/**
 * Mock API Service
 * 
 * This file simulates backend endpoints with artificial delays to mimic real network requests.
 * Use these functions in your challenge solutions.
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Challenge: API Data Fetcher ---
export const fetchPosts = async () => {
  await delay(1000); // Simulate network latency
  
  // Simulate occasional error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch posts: Internal Server Error");
  }

  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Post Title ${i + 1}`,
    body: `This is the body of post ${i + 1}. It mimics a real API response.`,
  }));
};

// --- Challenge: Debounced Search Bar ---
export const searchItems = async (query) => {
  await delay(500); // Simulate network latency
  if (!query) return [];
  
  const allItems = [
    "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew", 
    "Kiwi", "Lemon", "Mango", "Nectarine", "Orange", "Papaya", "Quince", "Raspberry", 
    "Strawberry", "Tangerine", "Ugli Fruit", "Watermelon"
  ];
  
  return allItems.filter(item => item.toLowerCase().includes(query.toLowerCase()));
};

// --- Challenge: Infinite Scroll ---
export const fetchInfiniteItems = async (page, limit = 10) => {
  await delay(800);
  const start = (page - 1) * limit;
  const end = start + limit;
  
  const items = Array.from({ length: limit }, (_, i) => ({
    id: start + i + 1,
    text: `Infinite Item #${start + i + 1}`,
    color: `hsl(${Math.random() * 360}, 70%, 80%)`
  }));

  return {
    items,
    hasMore: end < 100 // Stop after 100 items
  };
};

// --- Challenge: Nested Comments ---
export const fetchComments = async () => {
  await delay(600);
  return [
    {
      id: 1,
      author: "User 1",
      text: "This is a root comment",
      replies: [
        {
          id: 2,
          author: "User 2",
          text: "This is a nested reply",
          replies: []
        }
      ]
    },
    {
      id: 3,
      author: "User 3",
      text: "Another root comment",
      replies: []
    }
  ];
};

export const postReply = async (parentId, text) => {
  await delay(400);
  return {
    id: Date.now(),
    author: "You",
    text,
    replies: []
  };
};

// --- Challenge: Context Form Builder (Schema) ---
export const fetchFormSchema = async () => {
  await delay(300);
  return {
    title: "User Registration",
    fields: [
      { name: "username", label: "Username", type: "text", required: true, minLength: 3 },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "age", label: "Age", type: "number", min: 18 },
      { name: "role", label: "Role", type: "select", options: ["User", "Admin", "Guest"], required: true }
    ]
  };
};

export const submitForm = async (data) => {
  await delay(1500);
  console.log("Form Submitted:", data);
  return { success: true };
};

