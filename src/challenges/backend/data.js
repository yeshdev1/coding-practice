export const backendChallenges = [
  // --- FOUNDATIONAL / ALGORITHMIC CHALLENGES (EASY) ---
  {
    id: 'normalize-data',
    title: 'Data Normalization',
    difficulty: 'easy',
    pLevel: 'p0',
    category: 'core',
    expectedTime: '20m',
    description: `**Scenario:** Our legacy SQL database returns flat rows where User data and Address data are joined (e.g., \`user_id\`, \`user_name\`, \`addr_street\`). The frontend React application, however, expects a clean, nested JSON object for each user.

**Task:** Write a transformation utility that takes this flat list of database rows and returns a list of User objects where address fields are nested under an \`address\` property.`,
    initialCode: `function solution(rows) { return rows.map(r => r); }`,
    mockDb: null,
    testCases: [
      { 
        input: [{ id: 1, name: 'Alice', addr_street: '123 Main', addr_city: 'City' }], 
        expected: [{ id: 1, name: 'Alice', address: { street: '123 Main', city: 'City' } }] 
      }
    ],
    concepts: [
        {
            title: "Database Normalization",
            description: "The process of organizing data in a database to reduce redundancy. While SQL often joins data into flat rows for queries, applications typically prefer nested objects (trees) for representation.",
            links: [
                { text: "What is Database Normalization?", url: "https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description" }
            ]
        },
        {
            title: "Data Transformation (ETL)",
            description: "Extract, Transform, Load. This challenge mimics the 'Transform' phase where raw data is reshaped into a target schema.",
            links: [
                { text: "Data Transformation Explained", url: "https://www.ibm.com/topics/etl" }
            ]
        }
    ]
  },
  {
    id: 'pagination',
    title: 'Pagination Helper',
    difficulty: 'easy',
    pLevel: 'p0',
    category: 'core',
    expectedTime: '15m',
    description: `**Scenario:** The 'All Products' API endpoint is crashing browsers because it tries to return 10,000 items in a single request. We need to implement server-side pagination immediately.

**Task:** Create a reusable pagination helper function. It should accept an array of items, a page number, and a page size. It must return the specific slice of data for that page, along with metadata (total items, total pages, current page) so the frontend can render the pagination controls.`,
    initialCode: `function solution({ items, page, pageSize }) { return { data: [], meta: {} }; }`,
    testCases: [{ input: { items: [1,2,3], page: 1, pageSize: 2 }, expected: { data: [1,2], meta: { total: 3, totalPages: 2, currentPage: 1 } } }],
    concepts: [
        {
            title: "Offset-Based Pagination",
            description: "The simplest form of pagination where you skip N items and take M items. It's easy to implement but can be slow for large offsets (O(N)).",
            links: [
                { text: "Pagination Strategies", url: "https://www.citusdata.com/blog/2016/03/30/five-ways-to-paginate/" }
            ]
        },
        {
            title: "API Design Patterns",
            description: "Good APIs always return metadata (like total count) so clients can build UI navigation.",
            links: [
                { text: "REST API Pagination", url: "https://restfulapi.net/pagination/" }
            ]
        }
    ]
  },
  {
    id: 'file-system',
    title: 'Virtual File System',
    difficulty: 'easy',
    pLevel: 'p0',
    category: 'core',
    expectedTime: '25m',
    description: `**Scenario:** We are building a web-based IDE (like this one!) and need a lightweight in-memory file system to store the user's code before it's saved to the cloud.

**Task:** Implement a simple class or function that handles a stream of file operations: \`WRITE\` (create/update a file) and \`READ\` (retrieve content). The system should start empty and return the result of read operations.`,
    initialCode: `function solution(commands) { return []; }`,
    testCases: [{ input: [["WRITE", "a", "b"], ["READ", "a"]], expected: ["b"] }],
    concepts: [
        {
            title: "Key-Value Stores",
            description: "At its core, a file system can be modeled as a key-value store (filename -> content). This is how systems like Redis work.",
            links: []
        },
        {
            title: "Command Pattern",
            description: "Encapsulating requests as objects (e.g., ['WRITE', 'a', 'b']). This allows for queuing, logging, and undoable operations.",
            links: [
                { text: "Command Pattern", url: "https://refactoring.guru/design-patterns/command" }
            ]
        }
    ]
  },
  {
    id: 'log-parser',
    title: 'Log Aggregator',
    difficulty: 'easy',
    pLevel: 'p0',
    category: 'core',
    expectedTime: '20m',
    description: `**Scenario:** The SRE team needs a quick dashboard to see how many errors are occurring in production. They are sending us a raw stream of log messages.

**Task:** Parse a multiline string of log entries (e.g., "INFO User logged in", "ERROR DB Connection failed") and return an object counting the occurrences of each log level (INFO, WARN, ERROR).`,
    initialCode: `function solution(logs) { return {}; }`,
    testCases: [{ input: "INFO A\nERROR B", expected: { INFO: 1, ERROR: 1 } }],
    concepts: [
        {
            title: "String Parsing & Regex",
            description: "Extracting structured data from unstructured text. Essential for logging, scraping, and data processing.",
            links: []
        },
        {
            title: "Aggregations",
            description: "Grouping data to provide insights (Count, Sum, Average). This is similar to SQL's `GROUP BY` clause.",
            links: []
        }
    ]
  },
  {
    id: 'cache-ttl',
    title: 'In-Memory Cache with TTL',
    difficulty: 'easy',
    pLevel: 'p1',
    category: 'core',
    expectedTime: '20m',
    description: `**Scenario:** To reduce load on our primary database, we need to cache user session data. However, sessions must expire automatically for security.

**Task:** Implement a key-value cache store that supports \`SET\` (with a Time-To-Live in seconds), \`GET\` (return null if expired), and a simulated \`WAIT\` command to advance time during testing.`,
    initialCode: `function solution(cmds) { return []; }`,
    testCases: [{ input: [["SET","A",1,5],["GET","A"]], expected: [null, 1] }],
    concepts: [
        {
            title: "Time-To-Live (TTL)",
            description: "A mechanism to limit the lifespan of data in a computer or network. Used in caching, DNS, and packets.",
            links: [
                { text: "What is TTL?", url: "https://www.cloudflare.com/learning/cdn/what-is-time-to-live/" }
            ]
        },
        {
            title: "Lazy Expiration",
            description: "Instead of actively deleting expired items (which is expensive), check expiration only when the item is accessed.",
            links: []
        }
    ]
  },
  {
    id: 'event-emitter',
    title: 'Simple Event Emitter',
    difficulty: 'easy',
    pLevel: 'p1',
    category: 'core',
    expectedTime: '25m',
    description: `**Scenario:** We are decoupling our monolithic application. Different modules need to communicate without importing each other directly.

**Task:** Build a basic Event Bus. It should support subscribing to events (\`ON\`), triggering them (\`EMIT\`), and unsubscribing (\`OFF\`). When an event is emitted, all active callbacks for that event name should be invoked with the data.`,
    initialCode: `function solution(cmds) { return []; }`,
    testCases: [{ input: [["ON","a","1"],["EMIT","a","b"]], expected: ["1: b"] }],
    concepts: [
        {
            title: "Observer Pattern",
            description: "A design pattern where an object (Subject) maintains a list of dependents (Observers) and notifies them of state changes.",
            links: [
                { text: "Observer Pattern", url: "https://refactoring.guru/design-patterns/observer" }
            ]
        },
        {
            title: "Pub/Sub Messaging",
            description: "Decoupling senders (publishers) from receivers (subscribers) to improve scalability and maintainability.",
            links: []
        }
    ]
  },
  {
    id: 'deep-merge',
    title: 'Config Deep Merger',
    difficulty: 'easy',
    pLevel: 'p1',
    category: 'core',
    expectedTime: '20m',
    description: `**Scenario:** Our service has a \`default-config.json\` and customers provide a \`user-overrides.json\`. We need to combine them so that user settings override defaults, but without losing nested default settings that weren't overridden.

**Task:** Implement a deep merge function that recursively merges two objects.`,
    initialCode: `function solution(args) { return {}; }`,
    testCases: [{ input: [{a:1}, {b:2}], expected: {a:1, b:2} }],
    concepts: [
        {
            title: "Recursion",
            description: "Solving a problem by breaking it down into smaller instances of the same problem. Essential for tree-like structures (JSON, DOM, File Systems).",
            links: []
        },
        {
            title: "Immutability",
            description: "In React and Redux, merging objects usually requires creating new references rather than mutating inputs.",
            links: []
        }
    ]
  },
  {
    id: 'url-parser',
    title: 'URL Query Parser',
    difficulty: 'easy',
    pLevel: 'p1',
    category: 'core',
    expectedTime: '15m',
    description: `**Scenario:** Marketing needs to track campaign clicks. The incoming HTTP requests contain UTM parameters in the query string (e.g., \`?source=google&campaign=spring_sale\`).

**Task:** Write a function that parses a full URL string and returns a key-value object of all query parameters.`,
    initialCode: `function solution(url) { return {}; }`,
    testCases: [{ input: "http://a.com?b=1", expected: {b:"1"} }],
    concepts: [
        {
            title: "URI Standard (RFC 3986)",
            description: "Understanding the anatomy of a URL: Scheme, Authority, Path, Query, and Fragment.",
            links: [
                { text: "Anatomy of a URL", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL" }
            ]
        },
        {
            title: "URL Encoding",
            description: "Handling special characters in URLs (e.g., spaces become %20).",
            links: []
        }
    ]
  },
  {
    id: 'middleware-chain',
    title: 'Middleware Chain',
    difficulty: 'medium',
    pLevel: 'p1',
    category: 'core',
    expectedTime: '25m',
    description: `**Scenario:** We are building a micro-framework similar to Express.js. We need a way to run a request through a sequence of middleware functions (authentication, logging, body parsing) before handling it.

**Task:** Implement a function that takes a list of middleware tasks and executes them in order. Each task receives the data and modifies it for the next one.`,
    initialCode: `async function solution(mw) { return 0; }`,
    testCases: [{ input: ["ADD 1"], expected: 1 }],
    concepts: [
        {
            title: "Chain of Responsibility",
            description: "A behavioral design pattern that lets you pass requests along a chain of handlers.",
            links: [
                { text: "Chain of Responsibility", url: "https://refactoring.guru/design-patterns/chain-of-responsibility" }
            ]
        },
        {
            title: "Middleware Pattern",
            description: "Software glue that sits between the OS and apps, or between different layers of an app (e.g., Express/Redux middleware).",
            links: []
        }
    ]
  },
  {
    id: 'dedup-transactions',
    title: 'Deduplicate Transactions',
    difficulty: 'easy',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '20m',
    description: `**Scenario:** Our payment provider sometimes sends the same webhook event twice (at-least-once delivery). If we process it twice, we charge the customer twice.

**Task:** Given a stream of transaction objects, filter out duplicates. If a transaction ID appears multiple times, keep only the one with the latest timestamp.`,
    initialCode: `function solution(txs) { return []; }`,
    testCases: [{ input: [{id:1, t:1}], expected: [{id:1, t:1}] }],
    concepts: [
        {
            title: "Idempotency",
            description: "The property that an operation can be applied multiple times without changing the result beyond the initial application.",
            links: [
                { text: "What is Idempotency?", url: "https://stripe.com/blog/idempotency" }
            ]
        },
        {
            title: "Data Cleaning",
            description: "Preprocessing data to remove noise, duplicates, and errors before analysis or storage.",
            links: []
        }
    ]
  },
  {
    id: 'inventory-update',
    title: 'Inventory Update',
    difficulty: 'easy',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '20m',
    description: `**Scenario:** A fresh shipment of products has arrived at the warehouse. We need to update our current inventory counts with the new delivery manifest.

**Task:** Write a function that takes the current inventory object and a delivery object (both mapping ItemSKU -> Count) and returns the new total inventory.`,
    initialCode: `function solution({current, delivery}) { return {}; }`,
    testCases: [{ input: {current:{a:1}, delivery:{a:1}}, expected: {a:2} }],
    concepts: [
        {
            title: "Hash Maps / Dictionaries",
            description: "Using Key-Value structures for O(1) lookups and aggregations.",
            links: []
        }
    ]
  },
  {
    id: 'find-missing',
    title: 'Find Missing ID',
    difficulty: 'easy',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '15m',
    description: `**Scenario:** We process orders sequentially. An alert fired saying that an Order ID is missing from the sequence, indicating a potential data loss or failed transaction.

**Task:** Given a list of sorted Order IDs (integers), find the one missing number in the sequence so we can investigate.`,
    initialCode: `function solution(ids) { return 0; }`,
    testCases: [{ input: [1,3], expected: 2 }],
    concepts: [
        {
            title: "Linear vs Binary Search",
            description: "Finding an item in a sorted list can be done in O(log n) instead of O(n).",
            links: []
        },
        {
            title: "Arithmetic Series",
            description: "Using the formula n*(n+1)/2 to find missing numbers by comparing expected sum vs actual sum.",
            links: []
        }
    ]
  },
  {
    id: 'sql-generator',
    title: 'Simple SQL Generator',
    difficulty: 'easy',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '20m',
    description: `**Scenario:** We are building a lightweight internal ORM (Object-Relational Mapper). We need a utility to generate raw SQL queries from a JavaScript configuration object.

**Task:** Implement a function that takes a table name and an ID, and returns a valid \`SELECT\` SQL string.`,
    initialCode: `function solution({table, id}) { return ""; }`,
    testCases: [{ input: {table:"a", id:1}, expected: "SELECT * FROM a WHERE id = 1" }],
    concepts: [
        {
            title: "Object-Relational Mapping (ORM)",
            description: "A technique for converting data between incompatible type systems (Objects vs Relational Tables).",
            links: []
        },
        {
            title: "SQL Injection Prevention",
            description: "Why we must be careful when generating SQL strings (though this challenge is simple).",
            links: [
                { text: "SQL Injection", url: "https://owasp.org/www-community/attacks/SQL_Injection" }
            ]
        }
    ]
  },
  {
    id: 'obj-flattener',
    title: 'Object Flattener',
    difficulty: 'medium',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '25m',
    description: `**Scenario:** The Data Science team asks for a CSV export of our user data. However, our data is stored in MongoDB as complex nested objects. CSVs require flat columns.

**Task:** Write a function that flattens a nested object into a single-level object using dot notation for keys (e.g., \`{ user: { name: 'A' } }\` becomes \`{ "user.name": "A" }\`).`,
    initialCode: `function solution(obj) { return {}; }`,
    testCases: [{ input: {a:{b:1}}, expected: {"a.b":1} }],
    concepts: [
        {
            title: "Tree Traversal (DFS)",
            description: "Visiting every node in a hierarchical structure (like a JSON object) using Depth-First Search.",
            links: []
        },
        {
            title: "Serialization",
            description: "Converting a data structure into a format that can be stored or transmitted (like flattening for CSV).",
            links: []
        }
    ]
  },
  {
    id: 'cursor-pagination',
    title: 'Infinite Scroll API (Cursor Pagination)',
    difficulty: 'medium',
    pLevel: 'p1',
    category: 'core',
    expectedTime: '30m',
    description: `**Scenario:** The "Social Feed" endpoint is getting slower as users scroll deeper. We are currently using Offset-based pagination (\`SKIP 10000 LIMIT 10\`), which is O(N). We need to switch to Cursor-based pagination for O(1) performance.

**Task:** Implement \`getFeed(cursor, limit)\`.
- The \`cursor\` is the ID of the last item seen.
- Assume items have sequential IDs.
- Return \`nextItems\` (where ID > cursor) and the new \`nextCursor\`.`,
    initialCode: `const db = [
  { id: 1, content: 'A' },
  { id: 2, content: 'B' },
  { id: 3, content: 'C' },
  { id: 4, content: 'D' },
  { id: 5, content: 'E' }
];

function solution({ cursor, limit }) {
  const start = cursor ? db.findIndex(i => i.id === cursor) + 1 : 0;
  return { data: [], nextCursor: null };
}`,
    testCases: [{ input: { cursor: 2, limit: 2 }, expected: { data: [{id:3, content:'C'}, {id:4, content:'D'}], nextCursor: 4 } }],
    concepts: [
        {
            title: "Cursor vs Offset Pagination",
            description: "Offset pagination (`LIMIT 10 OFFSET 10000`) gets slower as offset increases because the DB must scan and drop rows. Cursor pagination (`WHERE id > last_id LIMIT 10`) uses an index, making it O(1) regardless of depth.",
            links: [
                { text: "Cursor vs Offset Pagination", url: "https://slack.engineering/evolving-api-pagination-at-slack/" }
            ]
        },
        {
            title: "Keyset Pagination",
            description: "Using a unique, sortable column (or set of columns) as a pointer to the next page.",
            links: []
        }
    ]
  },
  {
    id: 'rbac-middleware',
    title: 'Role-Based Access Control',
    difficulty: 'medium',
    pLevel: 'p1',
    category: 'core',
    expectedTime: '25m',
    description: `**Scenario:** We have a mix of "Admins", "Editors", and "Viewers". We need a central middleware to enforce permissions so we don't have \`if (user.role === 'admin')\` scattered everywhere.

**Task:** Implement \`checkPermission(user, resource, action)\`.
- Policies:
  - Admin: Allow everything.
  - Editor: Allow 'read'/'write' on 'articles'.
  - Viewer: Allow 'read' only.
- Return \`true\` or \`false\`.`,
    initialCode: `function solution({ user, resource, action }) {
  return false;
}`,
    testCases: [{ input: { user: { role: 'viewer' }, resource: 'articles', action: 'write' }, expected: false }],
    concepts: [
        {
            title: "Role-Based Access Control (RBAC)",
            description: "Restricting system access to authorized users based on their roles. It simplifies permission management compared to assigning permissions to users individually.",
            links: [
                { text: "RBAC Explained", url: "https://auth0.com/docs/manage-users/access-control/rbac" }
            ]
        },
        {
            title: "Authorization vs Authentication",
            description: "Authentication is 'Who are you?'. Authorization is 'What are you allowed to do?'.",
            links: []
        }
    ]
  },
  {
    id: 'idempotency-key',
    title: 'Idempotency Mechanism',
    difficulty: 'medium',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '30m',
    description: `**Scenario:** If a client's network fails after sending a payment request, they retry. Without Idempotency, we might charge them twice.

**Task:** Implement \`processRequest(req)\`.
- \`req\` contains \`idempotencyKey\`.
- If key is seen for the first time: Process it (return "processed"), store result.
- If key was seen before: Return the *cached* result immediately (do not process again).
- Use a local object or \`system.cache\` to store keys.`,
    initialCode: `const seen = {};
function solution(req) {
  // Check seen
  return "processed";
}`,
    testCases: [
      { input: { idempotencyKey: 'k1', data: 'charge' }, expected: "processed" }
    ],
    concepts: [
        {
            title: "Idempotency in Distributed Systems",
            description: "Ensuring that retrying a request (due to network failure) does not cause side effects like double-billing.",
            links: [
                { text: "Idempotency Keys", url: "https://stripe.com/blog/idempotency" }
            ]
        },
        {
            title: "Atomic Check-and-Set",
            description: "Race conditions can occur if two identical requests arrive simultaneously. A real implementation needs atomic locks (like `SETNX` in Redis).",
            links: []
        }
    ]
  },

  {
    id: 'leaky-bucket',
    title: 'Leaky Bucket Rate Limiter',
    difficulty: 'medium',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '35m',
    description: `**Scenario:** We need to smooth out bursty traffic to our API. The "Leaky Bucket" algorithm allows requests to queue up but processes them at a constant rate.

**Task:** Implement a class \`LeakyBucket\`.
- \`capacity\`: Max requests the bucket can hold.
- \`leakRate\`: Requests processed per second (simulated).
- \`addRequest()\`: Returns \`true\` if added to bucket, \`false\` if bucket is full (dropped).
- \`tick()\`: Removes requests from the bucket based on leak rate. Return number of leaked items.`,
    initialCode: `class LeakyBucket {
  constructor(capacity, leakRate) {
    this.capacity = capacity;
    this.leakRate = leakRate;
    this.current = 0;
  }

  addRequest() {
    return true;
  }

  tick() {
    // Leaks items
    return 0;
  }
}

// Wrapper for tester
const bucket = new LeakyBucket(10, 2);
function solution(action) {
  if (action === 'add') return bucket.addRequest();
  if (action === 'tick') return bucket.tick();
}`,
    testCases: [
      { input: 'add', expected: true },
      { input: 'tick', expected: 0 } // Expect 0 initially if empty, depends on implementation logic flow
    ],
    concepts: [
        {
            title: "Traffic Shaping",
            description: "Techniques to control the volume and rate of traffic sent to a network interface. Leaky Bucket converts bursty traffic into a smooth, constant flow.",
            links: [
                { text: "Leaky Bucket Algorithm", url: "https://en.wikipedia.org/wiki/Leaky_bucket" }
            ]
        },
        {
            title: "Queueing Theory",
            description: "Understanding how queues fill up and empty is vital for system stability.",
            links: []
        }
    ]
  },

  {
    id: 'task-scheduler',
    title: 'Dependency Task Scheduler',
    difficulty: 'medium',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '40m',
    description: `**Scenario:** We have a build system where tasks depend on others (e.g., 'build' depends on 'lint' and 'test'). We need to determine the execution order.

**Task:** Implement \`schedule(tasks)\`.
- Input: \`{ 'build': ['lint', 'test'], 'lint': [], 'test': [] }\`.
- Output: Array of tasks in valid topological order (e.g., \`['lint', 'test', 'build']\`).
- If a cycle is detected (A -> B -> A), return \`"cycle"\`.`,
    initialCode: `function solution(tasks) {
  // Topological Sort
  return [];
}`,
    testCases: [
      { input: { 'a': ['b'], 'b': [] }, expected: ['b', 'a'] }
    ],
    concepts: [
        {
            title: "Topological Sort",
            description: "A linear ordering of vertices in a directed graph such that for every directed edge from u to v, u comes before v. Used in build systems (Webpack/Make) and package managers.",
            links: [
                { text: "Topological Sorting", url: "https://en.wikipedia.org/wiki/Topological_sorting" }
            ]
        },
        {
            title: "Directed Acyclic Graph (DAG)",
            description: "A graph with no directed cycles. Dependencies usually form a DAG.",
            links: []
        }
    ]
  },

  {
    id: 'pub-sub-wildcard',
    title: 'Pub/Sub with Wildcards',
    difficulty: 'medium',
    pLevel: 'p2',
    category: 'core',
    expectedTime: '35m',
    description: `**Scenario:** A messaging system needs to support wildcard subscriptions.
- \`subscribe('user.*')\` should match \`publish('user.created')\` and \`publish('user.deleted')\`.

**Task:** Implement \`PubSub\`.
- \`subscribe(pattern, callback)\`
- \`publish(topic, message)\` -> triggers all matching callbacks.`,
    initialCode: `const subscribers = [];
function solution(op) {
  if (op.type === 'sub') {
    subscribers.push(op.pattern);
    return "ok";
  }
  if (op.type === 'pub') {
    // find matching subscribers
    return 0; // count of triggered
  }
}`,
    testCases: [
      { input: { type: 'sub', pattern: 'a.*' }, expected: "ok" }
    ],
    concepts: [
        {
            title: "Pattern Matching (Trie/Regex)",
            description: "Efficiently matching strings against patterns. For high performance, a Trie or specialized tree is preferred over iterating all Regexes.",
            links: []
        },
        {
            title: "Message Brokers (RabbitMQ/Kafka)",
            description: "Real-world systems use 'Topic Exchanges' to route messages based on wildcards.",
            links: [
                { text: "RabbitMQ Topic Exchange", url: "https://www.rabbitmq.com/tutorials/tutorial-five-python" }
            ]
        }
    ]
  },

  // --- SYSTEM DESIGN CHALLENGES (MEDIUM/HARD) ---
  {
    id: 'rate-limiter',
    title: 'API Rate Limiter',
    difficulty: 'easy',
    pLevel: 'p0',
    category: 'systems',
    expectedTime: '20m',
    description: `**Scenario:** A malicious bot is spamming our public login endpoint, trying to brute-force passwords. This is degrading performance for legitimate users.

**Task:** Implement a Rate Limiter function \`isAllowed(userId)\`. It should allow a maximum of 5 requests per minute per user. If a user exceeds this, return \`false\` (block them).`,
    initialCode: `async function solution(id) { return true; }`,
    testCases: [{ input: "u1", expected: true }],
    concepts: [
        {
            title: "Rate Limiting Strategies",
            description: "Common algorithms include Token Bucket, Leaky Bucket, Fixed Window Counter, and Sliding Window Log.",
            links: [
                { text: "Rate Limiting Algorithms", url: "https://cloud.google.com/architecture/rate-limiting-strategies-techniques" }
            ]
        },
        {
            title: "DoS Protection",
            description: "Denial of Service. Rate limiting is the first line of defense against availability attacks.",
            links: []
        }
    ]
  },
  {
    id: 'load-balancer-simulation',
    title: 'Load Balancer Strategy',
    difficulty: 'medium',
    pLevel: 'p1',
    category: 'systems',
    expectedTime: '30m',
    description: `**Scenario:** We have 3 backend servers. Currently, we send all traffic to Server 1 until it crashes. We need a smarter distribution strategy.

**Task:** Implement a "Weighted Round Robin" load balancer. It should distribute incoming requests across the node pool based on a simple rotation, or optionally based on server capacity (weights).`,
    initialCode: `function solution(n) { return []; }`,
    testCases: [{ input: 4, expected: ["node-1", "node-1", "node-2", "node-3"] }],
    concepts: [
        {
            title: "Load Balancing Algorithms",
            description: "Round Robin, Least Connections, IP Hash. Weighted Round Robin allows sending more traffic to powerful servers.",
            links: [
                { text: "Load Balancing Techniques", url: "https://www.nginx.com/resources/glossary/load-balancing/" }
            ]
        },
        {
            title: "Horizontal Scaling",
            description: "Adding more machines to the pool (instead of making one machine stronger) requires a load balancer to distribute the work.",
            links: []
        }
    ]
  },
  {
    id: 'job-queue-processor',
    title: 'Async Job Queue Processor',
    difficulty: 'medium',
    pLevel: 'p1',
    category: 'systems',
    expectedTime: '35m',
    description: `**Scenario:** Sending emails is slow. If we send them during the user's HTTP request, the page hangs. We need to offload this to a background worker.

**Task:** Implement a worker that continuously polls a job queue. When a job appears (e.g., "send_email"), process it asynchronously. Ensure that if processing fails, the job is not lost (simulating retry logic is a plus).`,
    initialCode: `async function solution(cmd) { return 0; }`,
    testCases: [{ input: "start", validator: () => true }],
    concepts: [
        {
            title: "Asynchronous Processing",
            description: "Decoupling time-consuming tasks from the request-response cycle to improve user experience.",
            links: []
        },
        {
            title: "Message Durability",
            description: "Ensuring jobs persist even if the worker crashes. Usually involves 'acknowledgment' (ACK) mechanisms.",
            links: [
                { text: "Task Queues", url: "https://redis.io/docs/data-types/streams-tutorial/" }
            ]
        }
    ]
  },
  {
    id: 'caching-strategy',
    title: 'Write-Through Cache',
    difficulty: 'medium',
    pLevel: 'p1',
    category: 'systems',
    expectedTime: '30m',
    description: `**Scenario:** Our User Profile service is read-heavy (90% reads). We want to add a caching layer. However, we must ensure that when a user updates their profile, the cache doesn't serve stale data.

**Task:** Implement a "Write-Through" strategy: When writing data, update *both* the DB and the Cache. When reading, check Cache first; if missing (cache miss), load from DB and populate Cache ("Read-Aside").`,
    initialCode: `async function solution(op) { return null; }`,
    testCases: [{ input: {action:'read', id:1}, expected: null }],
    concepts: [
        {
            title: "Caching Patterns",
            description: "Write-Through (slow write, fast read, strong consistency), Write-Back (fast write, eventual consistency), Cache-Aside (lazy loading).",
            links: [
                { text: "Caching Strategies", url: "https://aws.amazon.com/caching/best-practices/" }
            ]
        },
        {
            title: "Cache Consistency",
            description: "The hardest problem in CS. Keeping the cache in sync with the source of truth.",
            links: []
        }
    ]
  },
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker Pattern',
    difficulty: 'hard',
    pLevel: 'p2',
    category: 'systems',
    expectedTime: '45m',
    description: `**Scenario:** Our application relies on a third-party "Payment Gateway" API. Sometimes this API goes down or becomes extremely slow. When this happens, our threads pile up waiting for it, eventually crashing *our* server (Cascading Failure).

**Task:** Implement a Circuit Breaker. It should wrap the API calls. If failures exceed a threshold, the breaker "trips" (OPEN state) and immediately fails subsequent calls without hitting the external API, allowing the system to recover. After a timeout, it tries again (HALF-OPEN).`,
    initialCode: `function solution(calls) { return []; }`,
    testCases: [{ input: [false], expected: ["fail"] }],
    concepts: [
        {
            title: "Circuit Breaker Pattern",
            description: "Prevents an application from repeatedly trying to execute an operation that's likely to fail. States: Closed (Normal), Open (Failing), Half-Open (Testing).",
            links: [
                { text: "Circuit Breaker", url: "https://martinfowler.com/bliki/CircuitBreaker.html" }
            ]
        },
        {
            title: "Cascading Failures",
            description: "When a failure in one component triggers failures in subsequent components.",
            links: []
        }
    ]
  },
  {
    id: 'distributed-lock',
    title: 'Distributed Lock Simulation',
    difficulty: 'hard',
    pLevel: 'p2',
    category: 'systems',
    expectedTime: '40m',
    description: `**Scenario:** We have two background workers running on different servers. Both wake up at midnight to generate the "Daily Report". If they both run, we charge the client twice. We need to ensure *mutually exclusive* access.

**Task:** Simulate a Distributed Lock using a shared key-value store (like Redis).
1. \`acquireLock(resource, ttl)\`: Try to set a key if it doesn't exist.
2. \`releaseLock(resource, token)\`: Delete the key *only if* the value matches your token (preventing accidental release of someone else's lock).`,
    initialCode: `async function solution(ops) {
  const results = [];
  const token = "my-unique-token"; // Simulate this client's token
  
  for (const op of ops) {
    if (op.type === 'acquire') {
       // Check if lock exists in system.cache
       // If not, set it and push true
       // If yes, push false
       results.push(false);
    } else if (op.type === 'release') {
       // Check if lock value matches token
       // If yes, delete and push true
       results.push(false);
    }
  }
  return results;
}`,
    testCases: [
      {
        input: [{type:'acquire', res:'A', ttl:10}, {type:'acquire', res:'A', ttl:10}],
        expected: [true, false]
      }
    ],
    concepts: [
        {
            title: "Mutual Exclusion (Mutex)",
            description: "Ensuring that only one process can access a critical section at a time.",
            links: []
        },
        {
            title: "Distributed Locks with Redis (Redlock)",
            description: "Using `SET resource_name my_random_value NX PX 30000` to acquire a lock atomically.",
            links: [
                { text: "Distributed Locks with Redis", url: "https://redis.io/docs/manual/patterns/distributed-locks/" }
            ]
        }
    ]
  },

  // --- MULTI-STEP SYSTEM DESIGN CHALLENGES (COMPLEX) ---

  {
    id: 'microservice-saga',
    title: 'Distributed Order Saga',
    difficulty: 'hard',
    pLevel: 'p2',
    category: 'systems',
    expectedTime: '60m',
    type: 'multi-step',
    description: '**Scenario:** In a microservices architecture, an Order requires actions in two separate services: Inventory (reserve stock) and Payment (charge card). If Payment fails, we must "undo" the Inventory reservation. We cannot use a single database transaction.',
    steps: [
      {
        id: 'step1',
        title: 'Inventory Service',
        fileName: 'InventoryService.js',
        description: `**Task:** Implement the Inventory Microservice.
It needs methods to \`reserve(itemId, qty)\` (check stock, decrement) and \`release(itemId, qty)\` (compensation logic: increment stock back).`,
        initialCode: `const db = { "item_1": 10 };
module.exports = {
  async reserve(itemId, qty) { return false; },
  async release(itemId, qty) {}
};`,
        testCases: [
          { input: { method: 'reserve', args: ['item_1', 5] }, expected: true, mode: 'method_call' }
        ]
      },
      {
        id: 'step2',
        title: 'Payment Service',
        fileName: 'PaymentService.js',
        description: `**Task:** Implement the Payment Microservice.
It needs a \`charge(userId, amount)\` method. For simulation, assume it succeeds mostly but can fail. Also implement \`refund\` for compensation.`,
        initialCode: `module.exports = {
  async charge(userId, amount) { return "success"; },
  async refund(userId, amount) {}
};`,
        testCases: [
          { input: { method: 'charge', args: ['u1', 50] }, expected: 'success', mode: 'method_call' }
        ]
      },
      {
        id: 'step3',
        title: 'Order Orchestrator',
        fileName: 'OrderService.js',
        description: `**Task:** Implement the Saga Orchestrator.
The \`createOrder\` method should:
1. Call Inventory.reserve().
2. If success, Call Payment.charge().
3. If Payment fails, you MUST call Inventory.release() to rollback the stock reservation (Compensation).
4. Return "success" or "failure".`,
        initialCode: `const Inventory = require('./InventoryService.js');
const Payment = require('./PaymentService.js');
module.exports = {
  async createOrder(userId, itemId, qty, price) { return "success"; }
};`,
        testCases: [
          { input: { method: 'createOrder', args: ['u1', 'item_1', 1, 50] }, expected: 'success', mode: 'method_call' }
        ]
      }
    ],
    concepts: [
        {
            title: "Saga Pattern",
            description: "A sequence of local transactions. Each local transaction updates the database and publishes a message or event to trigger the next local transaction in the saga.",
            links: [
                { text: "Saga Pattern", url: "https://microservices.io/patterns/data/saga.html" }
            ]
        },
        {
            title: "Compensating Transactions",
            description: "Since we can't rollback a committed database transaction in another service, we must execute a new transaction that 'undoes' the changes (e.g., Refund implies undo Charge).",
            links: []
        }
    ]
  },

  {
    id: 'log-pipeline',
    title: 'Log Aggregation Pipeline',
    difficulty: 'hard',
    pLevel: 'p2',
    category: 'systems',
    expectedTime: '50m',
    type: 'multi-step',
    description: '**Scenario:** In high-scale production, we cannot read logs from files. We need a centralized pipeline where logs are collected, buffered in a queue, parsed for meaning, and then checked for critical alerts.',
    steps: [
      {
        id: 's1',
        title: 'Log Collector',
        fileName: 'Collector.js',
        description: `**Task:** Implement the ingestion layer.
The \`ingest(logString)\` function receives raw logs from servers. It should push them into a durable queue (mocked as \`system.queue\`) to ensure no logs are lost if the parser is slow.`,
        initialCode: `module.exports = { async ingest(log) { return true; } };`,
        testCases: [{ input: { method: 'ingest', args: ['ERR'] }, expected: true, mode: 'method_call' }]
      },
      {
        id: 's2',
        title: 'Log Parser',
        fileName: 'Parser.js',
        description: `**Task:** Implement the processing layer.
The \`process()\` function should pull messages from the queue, parse the JSON or string format, and extract the severity level.`,
        initialCode: `module.exports = { async process() { return {}; } };`,
        testCases: [{ input: { method: 'process', args: [] }, expected: null, mode: 'method_call' }]
      },
      {
        id: 's3',
        title: 'Alerting Engine',
        fileName: 'Alerting.js',
        description: `**Task:** Tie it all together.
Implement a pipeline runner that ingests a log, triggers the parser, and checks if the parsed log is an 'ERROR'. If so, trigger an alert.`,
        initialCode: `const C = require('./Collector.js'); const P = require('./Parser.js');
module.exports = { async runPipeline() { return "OK"; } };`,
        testCases: [{ input: { method: 'runPipeline', args: [] }, expected: "OK", mode: 'method_call' }]
      }
    ],
    concepts: [
        {
            title: "Event-Driven Architecture",
            description: "Using events (logs) to trigger actions (alerts) asynchronously.",
            links: []
        },
        {
            title: "Buffering (Queues)",
            description: "Decoupling producers (Log Collector) from consumers (Log Parser) using a queue handles bursty traffic and prevents data loss.",
            links: []
        }
    ]
  },

  {
    id: 'sharded-db',
    title: 'Sharded Database Proxy',
    difficulty: 'hard',
    pLevel: 'p2',
    category: 'systems',
    expectedTime: '55m',
    type: 'multi-step',
    description: '**Scenario:** Our User table has hit 1 billion rows and no longer fits on a single database server. We need to shard the data across multiple nodes based on User ID.',
    steps: [
      {
        id: 's1',
        title: 'Consistent Hashing',
        fileName: 'Router.js',
        description: `**Task:** We need to decide which shard a user belongs to.
Implement a deterministic hashing function \`getShard(userId)\` that maps a string ID to a shard index (0 to N).`,
        initialCode: `module.exports = { getShard(u) { return 0; } };`,
        testCases: [{ input: { method: 'getShard', args: ['a'] }, expected: 1, mode: 'method_call' }]
      },
      {
        id: 's2',
        title: 'Data Store',
        fileName: 'Store.js',
        description: `**Task:** Implement the storage interface.
The \`save(shardId, key, val)\` method should route the data to the correct simulated node storage.`,
        initialCode: `module.exports = { async save(s,k,v) {} };`,
        testCases: [{ input: { method: 'save', args: [0,'k','v'] }, expected: undefined, mode: 'method_call' }]
      },
      {
        id: 's3',
        title: 'Proxy Service',
        fileName: 'Proxy.js',
        description: `**Task:** Build the Proxy that hides this complexity from the application.
The app calls \`writeUser(userId, data)\`. The proxy must calculate the shard and route the write to the correct store.`,
        initialCode: `const R = require('./Router.js'); const S = require('./Store.js');
module.exports = { async writeUser(u,d) { return ""; } };`,
        testCases: [{ input: { method: 'writeUser', args: ['a','d'] }, expected: "Saved to shard 1", mode: 'method_call' }]
      }
    ],
    concepts: [
        {
            title: "Database Sharding",
            description: "Partitioning a large dataset horizontally across multiple databases.",
            links: [
                { text: "Sharding Explained", url: "https://www.digitalocean.com/community/tutorials/understanding-database-sharding" }
            ]
        },
        {
            title: "Proxy Pattern",
            description: "A server that sits between clients and other servers. Here, it acts as a 'Smart Client' that knows how to route data.",
            links: []
        }
    ]
  },

  {
    id: 'ride-sharing',
    title: 'Galactic Ride Dispatcher',
    difficulty: 'hard',
    pLevel: 'p2',
    category: 'systems',
    expectedTime: '70m',
    type: 'multi-step',
    description: '**Scenario:** You are the Lead Engineer at "NebulaCab". We need a new dispatch system for our fleet. The system needs to track drivers in real-time, calculate surge pricing based on supply/demand, and match riders to the nearest driver.',
    steps: [
      {
        id: 's1',
        title: 'Driver Tracking',
        fileName: 'DriverIndex.js',
        description: `**Task:** Manage geospatial data.
Implement \`updateLocation(driverId, x, y)\` to store coordinates.
Implement \`findNearest(x, y)\` to scan the active drivers and return the closest one using Euclidean distance.`,
        initialCode: `const drivers = {};
module.exports = {
  updateLocation(id, x, y) {
    drivers[id] = {x, y};
  },
  findNearest(x, y) {
    // Find closest driver in 'drivers'
    return null;
  }
};`,
        testCases: [
          { input: { method: 'updateLocation', args: ['d1', 0, 0] }, expected: undefined, mode: 'method_call' },
          { input: { method: 'findNearest', args: [1, 1] }, expected: 'd1', mode: 'method_call' }
        ]
      },
      {
        id: 's2',
        title: 'Surge Pricing',
        fileName: 'Pricing.js',
        description: `**Task:** Implement dynamic pricing logic.
If demand (riders) exceeds supply (drivers), apply a multiplier.
- If Riders > Drivers * 2 -> 2.0x Surge.
- If Riders > Drivers -> 1.5x Surge.
- Else 1.0x.`,
        initialCode: `module.exports = {
  getMultiplier(drivers, riders) {
    return 1.0;
  }
};`,
        testCases: [
          { input: { method: 'getMultiplier', args: [10, 5] }, expected: 1.0, mode: 'method_call' },
          { input: { method: 'getMultiplier', args: [5, 15] }, expected: 2.0, mode: 'method_call' }
        ]
      },
      {
        id: 's3',
        title: 'Mission Control',
        fileName: 'Dispatcher.js',
        description: `**Task:** Orchestrate the booking.
When \`requestRide(riderId, x, y)\` is called:
1. Find the nearest driver. If none, return "NO_CARS".
2. Calculate the current price multiplier.
3. Return the match details.`,
        initialCode: `const Index = require('./DriverIndex.js');
const Pricing = require('./Pricing.js');

module.exports = {
  requestRide(riderId, x, y) {
    // impl
    return { driverId: null, priceMultiplier: 1 };
  }
};`,
        testCases: [
          { input: { method: 'requestRide', args: ['r1', 1, 1] }, expected: { driverId: 'd1', priceMultiplier: 2.0 }, mode: 'method_call' }
        ]
      }
    ],
    concepts: [
        {
            title: "Geospatial Indexing",
            description: "Efficiently querying location data. While this challenge uses a simple loop, real systems use Quadtrees or Geohashing.",
            links: [
                { text: "Geohashing", url: "https://en.wikipedia.org/wiki/Geohash" }
            ]
        },
        {
            title: "Dynamic Pricing (Supply & Demand)",
            description: "Algorithmic pricing based on real-time market conditions.",
            links: []
        }
    ]
  },

  {
    id: 'code-collab',
    title: 'Collaborative Code Editor',
    difficulty: 'hard',
    pLevel: 'p2',
    category: 'systems',
    expectedTime: '60m',
    type: 'multi-step',
    description: '**Scenario:** We are building a competitor to Google Docs/VS Code Live Share. Multiple users edit the same document simultaneously. Without concurrency control, user edits will overwrite each other.',
    steps: [
      {
        id: 's1',
        title: 'Operational Transform',
        fileName: 'Transform.js',
        description: `**Task:** Implement Operational Transformation (OT) logic.
If User A types "x" at index 5, and User B types "y" at index 2 *before* User A's change arrives, we must shift User A's insertion point to index 6.
Implement \`transform(opA, opB)\` to adjust opA based on the execution of opB.`,
        initialCode: `module.exports = {
  transform(opA, opB) {
    // Adjust opA.pos based on opB
    return opA;
  }
};`,
        testCases: [
          { 
            input: { method: 'transform', args: [{pos:5}, {pos:2}] }, 
            expected: {pos:6}, 
            mode: 'method_call' 
          }
        ]
      },
      {
        id: 's2',
        title: 'Document State',
        fileName: 'DocStore.js',
        description: `**Task:** Manage the document string.
Implement \`apply(op)\` which takes an operation (insert/delete) and mutates the current document string.`,
        initialCode: `let doc = "";
module.exports = {
  apply(op) {
    // splice string
    return doc;
  },
  reset() { doc = ""; } // Helper
};`,
        testCases: [
          { input: { method: 'apply', args: [{pos:0, char:'a'}] }, expected: "a", mode: 'method_call' }
        ]
      },
      {
        id: 's3',
        title: 'Sync Server',
        fileName: 'Server.js',
        description: `**Task:** Handle incoming edits.
When \`onMessage(newOp)\` arrives:
1. Transform the new operation against any operations that happened concurrently (simplified for this challenge).
2. Apply the transformed op to the DocStore.
3. Return the final document state.`,
        initialCode: `const Transform = require('./Transform.js');
const Store = require('./DocStore.js');

module.exports = {
  onMessage(newOp) {
    // Mock: assume 1 concurrent op happened at pos 0
    const recentOp = { pos: 0, char: 'z' }; 
    // Transform newOp against recentOp
    // Apply
    return "";
  }
};`,
        testCases: [
           { input: { method: 'onMessage', args: [{pos:0, char:'a'}] }, expected: "za", mode: 'method_call' } 
        ]
      }
    ],
    concepts: [
        {
            title: "Operational Transformation (OT)",
            description: "The standard algorithm for resolving conflicts in real-time collaborative editing (Google Docs).",
            links: [
                { text: "Understanding OT", url: "https://en.wikipedia.org/wiki/Operational_transformation" }
            ]
        },
        {
            title: "Conflict-Free Replicated Data Types (CRDT)",
            description: "An alternative to OT that guarantees consistency without a central server, used in more modern collaborative apps.",
            links: []
        }
    ]
  },

  {
    id: 'fintech-ledger',
    title: 'Crypto Exchange Ledger',
    difficulty: 'hard',
    pLevel: 'p2',
    category: 'systems',
    expectedTime: '65m',
    type: 'multi-step',
    description: '**Scenario:** You are building the core ledger for a high-frequency crypto exchange. In this domain, floating-point math errors or unbalanced transactions are catastrophic. We need a Double-Entry Bookkeeping system.',
    steps: [
      {
        id: 's1',
        title: 'Double Entry Validator',
        fileName: 'Validator.js',
        description: `**Task:** Ensure zero-sum integrity.
Every transaction is a list of entries. The sum of all credits and debits must equal exactly ZERO.
Implement \`validate(entries)\` to reject unbalanced transactions.`,
        initialCode: `module.exports = {
  validate(entries) {
    return false;
  }
};`,
        testCases: [
          { input: { method: 'validate', args: [[{amount:-5}, {amount:5}]] }, expected: true, mode: 'method_call' },
          { input: { method: 'validate', args: [[{amount:-5}, {amount:4}]] }, expected: false, mode: 'method_call' }
        ]
      },
      {
        id: 's2',
        title: 'Account Manager',
        fileName: 'Accounts.js',
        description: `**Task:** Update balances.
If the transaction is valid, apply each entry to the respective user's account balance.
Return the new state of all modified accounts.`,
        initialCode: `const balances = { A: 100, B: 0 };
module.exports = {
  update(entries) {
    // apply
    return balances;
  }
};`,
        testCases: [
          { input: { method: 'update', args: [[{acct:'A', amount:-10}, {acct:'B', amount:10}]] }, expected: {A:90, B:10}, mode: 'method_call' }
        ]
      },
      {
        id: 's3',
        title: 'Transaction Engine',
        fileName: 'Engine.js',
        description: `**Task:** Process transfers.
Implement \`processTx(from, to, amount)\`:
1. Construct the double-entry record (Debit sender, Credit receiver).
2. Validate it.
3. Apply to accounts.
4. Return success/failure.`,
        initialCode: `const Validator = require('./Validator.js');
const Accounts = require('./Accounts.js');

module.exports = {
  processTx(from, to, amount) {
    return "success";
  }
};`,
        testCases: [
          { input: { method: 'processTx', args: ['A','B', 10] }, expected: "success", mode: 'method_call' }
        ]
      }
    ],
    concepts: [
        {
            title: "Double-Entry Bookkeeping",
            description: "The accounting standard where every entry to an account requires a corresponding and opposite entry to a different account. Sum must always be zero.",
            links: [
                { text: "Double-Entry Accounting", url: "https://en.wikipedia.org/wiki/Double-entry_bookkeeping" }
            ]
        },
        {
            title: "ACID Transactions",
            description: "Atomicity, Consistency, Isolation, Durability. Essential for financial data integrity.",
            links: []
        }
    ]
  },

  {
    id: 'sharded-counter',
    title: 'High-Throughput Sharded Counter',
    difficulty: 'expert',
    pLevel: 'p3',
    category: 'systems',
    expectedTime: '75m',
    type: 'multi-step',
    description: '**Scenario:** A viral video platform needs a "Like" button. A popular video can receive 100,000 likes per second. A single database row cannot handle this write contention (locking). We need to shard the counter.',
    steps: [
      {
        id: 's1',
        title: 'Shard Selector',
        fileName: 'ShardRouter.js',
        description: `**Task:** Distribute the load.
Instead of writing to key 'likes:video_1', we will write to 'likes:video_1:0', 'likes:video_1:1'... 'likes:video_1:N'.
Implement \`getShardKey(counterName, numShards)\` to randomly select one of the N shards for a write operation.`,
        initialCode: `module.exports = {
  getShardKey(name, numShards) {
    // Return "name:0" to "name:numShards-1"
    return name + ":0"; 
  }
};`,
        testCases: [
          { 
            input: { method: 'getShardKey', args: ['likes', 5] }, 
            validator: (result) => /^likes:[0-4]$/.test(result),
            expected: 'likes:0..4',
            mode: 'method_call' 
          }
        ]
      },
      {
        id: 's2',
        title: 'Increment Logic',
        fileName: 'CounterService.js',
        description: `**Task:** Perform the high-speed write.
1. Determine the shard key.
2. Use the atomic \`system.db.incr(key)\` operation to increment that specific shard.
3. This removes the single-row bottleneck.`,
        initialCode: `const Router = require('./ShardRouter.js');
module.exports = {
  async increment(counterName) {
    // Use system.db.incr(key)
    return "key";
  }
};`,
        testCases: [
          { input: { method: 'increment', args: ['video_123'] }, expected: 'video_123:x', validator: (res) => res.startsWith('video_123:'), mode: 'method_call' }
        ]
      },
      {
        id: 's3',
        title: 'Aggregator',
        fileName: 'Aggregator.js',
        description: `**Task:** Read the total count.
Since the count is split across 100 shards, reading the total requires "Scatter-Gather".
Use \`system.db.scan(prefix)\` to find all shard keys for the counter and sum their values.`,
        initialCode: `module.exports = {
  async getTotal(name) {
    // const shards = await system.db.scan(name + ":");
    return 0;
  }
};`,
        testCases: [
          { input: { method: 'getTotal', args: ['video_final'] }, expected: 0, mode: 'method_call' }
        ]
      }
    ],
    concepts: [
        {
            title: "Write Contention",
            description: "When multiple processes try to update the same database row simultaneously, causing locking and performance degradation.",
            links: []
        },
        {
            title: "Scatter-Gather Pattern",
            description: "Broadcasting a request to multiple nodes (Scatter) and aggregating the results (Gather).",
            links: []
        }
    ]
  },

  {
    id: 'consistent-hashing',
    title: 'Consistent Hashing Ring',
    difficulty: 'expert',
    pLevel: 'p3',
    category: 'systems',
    expectedTime: '80m',
    type: 'multi-step',
    description: '**Scenario:** We are building a distributed key-value store (like DynamoDB). When we add a new server node, we don\'t want to reshuffle ALL data keys. We need a Consistent Hashing strategy to minimize data movement.',
    steps: [
      {
        id: 's1',
        title: 'Ring Structure',
        fileName: 'Ring.js',
        description: `**Task:** Map nodes to a ring.
Imagine a circle (0 to 1000).
1. Hash the Node Name (e.g. "Server A") to an integer.
2. Place it on the ring (sorted array).`,
        initialCode: `const ring = [];
function simpleHash(str) {
  let hash = 0;
  for(let i=0; i<str.length; i++) hash = (hash + str.charCodeAt(i));
  return hash % 1000;
}

module.exports = {
  addNode(node) {
    // add to ring, sort
  },
  getRing() { return ring; }
};`,
        testCases: [
          { input: { method: 'addNode', args: ['A'] }, expected: undefined, mode: 'method_call' }
        ]
      },
      {
        id: 's2',
        title: 'Node Lookup',
        fileName: 'Router.js',
        description: `**Task:** Find the responsible node.
To find where "User_123" lives:
1. Hash "User_123" to get position P.
2. Walk clockwise on the ring to find the first Node with position >= P.
3. If you reach the end, wrap around to the first Node.`,
        initialCode: `const Ring = require('./Ring.js');
// reuse simpleHash from Ring or copy it
function simpleHash(str) {
  let hash = 0;
  for(let i=0; i<str.length; i++) hash = (hash + str.charCodeAt(i));
  return hash % 1000;
}

module.exports = {
  getNode(key) {
    const sortedRing = Ring.getRing();
    // find node
    return null;
  }
};`,
        testCases: [
          { input: { method: 'getNode', args: ['user_123'] }, expected: 'A', mode: 'method_call' }
        ]
      },
      {
        id: 's3',
        title: 'Virtual Nodes',
        fileName: 'VNodeManager.js',
        description: `**Task:** Solve data skew.
If we only have 2 nodes, one might get 90% of the ring.
Solution: "Virtual Nodes". Map each physical server to K points on the ring (e.g. ServerA_1, ServerA_2...).
Implement \`addPhysicalNode(node, k)\` to register these virtual points.`,
        initialCode: `const Ring = require('./Ring.js');
module.exports = {
  addPhysicalNode(node, k) {
    // for i = 0 to k-1
    //   Ring.addNode(node + "_" + i) (conceptually, but store reference to real node)
  }
};`,
        testCases: [
          { input: { method: 'addPhysicalNode', args: ['B', 3] }, expected: undefined, mode: 'method_call' }
        ]
      }
    ],
    concepts: [
        {
            title: "Consistent Hashing",
            description: "A distributed hashing scheme that operates independently of the number of servers or objects in a distributed hash table. It reduces remapping when scaling.",
            links: [
                { text: "Consistent Hashing Guide", url: "https://www.toptal.com/big-data/consistent-hashing" }
            ]
        },
        {
            title: "Data Partitioning",
            description: "Splitting a database into smaller, distinct parts to improve manageability and performance.",
            links: []
        }
    ]
  },

  {
    id: 'two-phase-commit',
    title: 'Two-Phase Commit (2PC)',
    difficulty: 'expert',
    pLevel: 'p3',
    category: 'systems',
    expectedTime: '90m',
    type: 'multi-step',
    description: '**Scenario:** We are transferring money between Bank A (in US) and Bank B (in EU). These are separate systems. We must ensure that money is deducted from A *if and only if* it is added to B. Atomicity is non-negotiable.',
    steps: [
      {
        id: 's1',
        title: 'Participant',
        fileName: 'Participant.js',
        description: `**Task:** Implement the Participant protocol.
1. \`prepare(txId)\`: Lock the account. If already locked, vote "NO" (return false). If free, lock it and vote "YES" (return true).
2. \`commit(txId)\`: Apply the change and unlock.
3. \`abort(txId)\`: Just unlock (rollback).`,
        initialCode: `const locks = {}; // txId -> status
module.exports = {
  async prepare(txId) {
    // check locks
    return true;
  },
  async commit(txId) {},
  async abort(txId) {}
};`,
        testCases: [
          { input: { method: 'prepare', args: ['tx1'] }, expected: true, mode: 'method_call' }
        ]
      },
      {
        id: 's2',
        title: 'Coordinator',
        fileName: 'Coordinator.js',
        description: `**Task:** Implement the Coordinator.
It manages the transaction lifecycle:
1. **Phase 1 (Voting):** Ask all participants to \`prepare()\`.
2. **Phase 2 (Decision):**
   - If *everyone* voted YES -> tell everyone to \`commit()\`.
   - If *anyone* voted NO (or timed out) -> tell everyone to \`abort()\`.`,
        initialCode: `module.exports = {
  async runTransaction(txId, participants) {
    // Phase 1: Prepare
    // Phase 2: Commit or Abort
    return "COMMITTED";
  }
};`,
        testCases: [
          { input: { method: 'runTransaction', args: ['tx_100', []] }, expected: "COMMITTED", mode: 'method_call' }
        ]
      }
    ],
    concepts: [
        {
            title: "Distributed Transactions",
            description: "Transactions that span two or more networked hosts. 2PC is a classic algorithm to achieve atomicity.",
            links: []
        },
        {
            title: "Consensus Protocols",
            description: "Agreements on a value among distributed processes. 2PC is a blocking protocol; alternatives like Paxos/Raft are non-blocking but complex.",
            links: [
                { text: "Two-Phase Commit", url: "https://martinfowler.com/articles/patterns-of-distributed-systems/two-phase-commit.html" }
            ]
        }
    ]
  },

  {
    id: 'federated-feed',
    title: 'Mega-Feed Aggregator',
    difficulty: 'expert',
    pLevel: 'p3',
    category: 'systems',
    expectedTime: '90m',
    type: 'multi-step',
    description: '**Scenario:** You are building the "Home Feed" for a massive social network. It aggregates content from 3 distinct microservices: "FriendsPosts", "GroupUpdates", and "RecommendedAds". All streams are infinite. You must merge them into a single time-sorted stream and support resumable scrolling (cursors).',
    steps: [
      {
        id: 's1',
        title: 'Merge Sorted Streams',
        fileName: 'Merger.js',
        description: `**Task:** Algorithmically merge multiple sorted arrays.
Implement \`merge(streams)\`.
- \`streams\` is an array of arrays: \`[[{id:10, t:100}, {id:8, t:90}], [{id:9, t:95}]]\`.
- All inputs are sorted by Time (descending).
- Return a single flattened array sorted by Time (descending).`,
        initialCode: `module.exports = {
  merge(streams) {
    // Efficiently merge K sorted arrays
    return [];
  }
};`,
        testCases: [
          { 
            input: { method: 'merge', args: [[[{id:1, t:10}], [{id:2, t:20}]]] }, 
            expected: [{id:2, t:20}, {id:1, t:10}], 
            mode: 'method_call' 
          }
        ]
      },
      {
        id: 's2',
        title: 'Cursor Tokenizer',
        fileName: 'Tokenizer.js',
        description: `**Task:** State Management.
We can't use a simple DB offset because we are reading from 3 different sources.
Our "Global Cursor" must encode the state of *each* sub-stream.
- Implement \`encode(cursors)\`: takes \`{ friends: 'id_a', groups: 'id_b', ads: 'id_c' }\` and returns a Base64 string.
- Implement \`decode(token)\`: reverses it.`,
        initialCode: `module.exports = {
  encode(cursors) {
    // JSON stringify -> Base64
    return "";
  },
  decode(token) {
    return {};
  }
};`,
        testCases: [
          { input: { method: 'encode', args: [{a:1}] }, validator: (res) => typeof res === 'string', expected: "eyJhIjoxfQ==", mode: 'method_call' } // Simple check
        ]
      },
      {
        id: 's3',
        title: 'Feed Service',
        fileName: 'Feed.js',
        description: `**Task:** The Aggregator.
Implement \`getFeed(globalCursorToken, limit)\`.
1. Decode token to get last-seen IDs for Friends, Groups, and Ads.
2. Fetch next batch from each service (mocked as \`system.db.scan\` or similar).
3. Merge them using your Merger.
4. Slice to \`limit\`.
5. Generate new cursor token from the last items of the used streams.`,
        initialCode: `const Merger = require('./Merger.js');
const Tokenizer = require('./Tokenizer.js');

const mockSources = {
  friends: [{id:100, t:100}, {id:90, t:90}],
  groups: [{id:95, t:95}],
  ads: []
};

module.exports = {
  async getFeed(token, limit) {
    // 1. Decode
    // 2. Fetch (use mockSources)
    // 3. Merge
    // 4. Return { items, nextCursor }
    return { items: [], nextCursor: "" };
  }
};`,
        testCases: [
          { input: { method: 'getFeed', args: [null, 2] }, expected: { items: [{id:100,t:100}, {id:95,t:95}], nextCursor: "..." }, validator: (res) => res.items.length === 2 && res.items[0].id === 100, mode: 'method_call' }
        ]
      }
    ],
    concepts: [
        {
            title: "Fan-Out / Fan-In",
            description: "Distributing work to multiple services (Fan-Out) and collecting results (Fan-In). Crucial for microservices aggregators.",
            links: []
        },
        {
            title: "Opaque Cursors",
            description: "Encoding complex state into a single string so the client doesn't need to understand implementation details.",
            links: []
        }
    ]
  },

  {
    id: 'geo-replication',
    title: 'Geo-Distributed Replication',
    difficulty: 'expert',
    pLevel: 'p3',
    category: 'systems',
    expectedTime: '80m',
    type: 'multi-step',
    description: '**Scenario:** We have a Global Key-Value Store. Writes go to the Master in "US-East". We need to replicate these writes to "EU-West" and "Asia-South" asynchronously. If a region goes down, we must handle failover.',
    steps: [
      {
        id: 's1',
        title: 'Replication Log',
        fileName: 'Replicator.js',
        description: `**Task:** Capture changes (CDC).
Implement \`logChange(key, value, timestamp)\`.
Store these changes in an append-only log so followers can fetch them.`,
        initialCode: `const changeLog = [];
module.exports = {
  logChange(k, v, t) {
    // push to log
  },
  getLogs(sinceIndex) { return changeLog.slice(sinceIndex); }
  };`,
        testCases: [
          { input: { method: 'logChange', args: ['k', 'v', 1] }, expected: undefined, mode: 'method_call' }
        ]
      },
      {
        id: 's2',
        title: 'Follower Sync',
        fileName: 'Follower.js',
        description: `**Task:** Apply updates.
The Follower node polls the Master's log.
Implement \`sync()\`. It should fetch new logs from Master and update its local \`db\`. Keep track of \`lastAppliedIndex\`.`,
        initialCode: `const Master = require('./Replicator.js');
const db = {};
let lastIndex = 0;

module.exports = {
  async sync() {
    // Master.getLogs(lastIndex)
    // apply to db
    // update lastIndex
    return db;
  }
};`,
        testCases: [
          { input: { method: 'sync', args: [] }, expected: {}, mode: 'method_call' }
        ]
      }
    ],
    concepts: [
        {
            title: "Replication Lag",
            description: "The delay between a write on the master and its appearance on a follower. In async replication, followers are 'eventually consistent'.",
            links: []
        },
        {
            title: "Leader-Follower Model",
            description: "A common architecture where one node accepts writes (Leader) and others replicate data for reads (Followers).",
            links: [
                { text: "Database Replication", url: "https://aws.amazon.com/rds/features/read-replicas/" }
            ]
        }
    ]
  },

  {
    id: 'bloom-filter',
    title: 'Custom Bloom Filter',
    difficulty: 'expert',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '45m',
    description: `**Scenario:** We need to check if a username is taken without hitting the DB for every keystroke. A Bloom Filter is a probabilistic structure that tells us "Definitely No" or "Maybe Yes".

**Task:** Implement a Bloom Filter.
- \`add(str)\`: Hash string K times, set bits in a bit array.
- \`exists(str)\`: Check if all K bits are set.
- **Constraint:** Use a simple array of booleans or integers to simulate bits.`,
    initialCode: `class BloomFilter {
  constructor(size = 100) {
    this.store = new Array(size).fill(0);
  }
  add(str) {
    // hash(str) -> index
    // set store[index] = 1
  }
  exists(str) {
    return false;
  }
}
const bf = new BloomFilter();
function solution(op) {
  if (op.action === 'add') bf.add(op.val);
  return bf.exists(op.val);
}`,
    testCases: [
      { input: { action: 'add', val: 'hello' }, expected: true },
      { input: { action: 'check', val: 'world' }, expected: false }
    ],
    concepts: [
        {
            title: "Probabilistic Data Structures",
            description: "Data structures that use randomness to save space, trading accuracy for efficiency (e.g. HyperLogLog, Bloom Filter).",
            links: [
                { text: "Bloom Filters Explained", url: "https://llimllib.github.io/bloomfilter-tutorial/" }
            ]
        },
        {
            title: "False Positives",
            description: "Bloom filters can say 'Yes' when the item is not actually present (False Positive), but never 'No' if it is present (False Negative).",
            links: []
        }
    ]
  },

  {
    id: 'lru-cache',
    title: 'LRU Cache (LeetCode Style)',
    difficulty: 'expert',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '50m',
    description: `**Scenario:** A classic interview problem. Design a Least Recently Used (LRU) cache.

**Task:** Implement \`LRUCache\` class.
- \`get(key)\`: Get value. If exists, move to front (recently used). Return -1 if not found.
- \`put(key, value)\`: Update/Insert. If over capacity, remove the *least recently used* item.
- **Requirement:** O(1) time complexity for both operations (Map + Doubly Linked List).`,
    initialCode: `class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    return -1;
  }
  put(key, value) {
  }
}
const lru = new LRUCache(2);
function solution(op) {
  if (op.type === 'put') lru.put(op.key, op.val);
  if (op.type === 'get') return lru.get(op.key);
}`,
    testCases: [
      { input: { type: 'put', key: 1, val: 1 }, expected: undefined },
      { input: { type: 'put', key: 2, val: 2 }, expected: undefined },
      { input: { type: 'get', key: 1 }, expected: 1 },
      { input: { type: 'put', key: 3, val: 3 }, expected: undefined }, // evicts 2
      { input: { type: 'get', key: 2 }, expected: -1 }
    ],
    concepts: [
        {
            title: "Cache Eviction Policies",
            description: "Algorithms to decide what to discard when cache is full. LRU (Least Recently Used) is common.",
            links: []
        },
        {
            title: "Hash Map + Linked List",
            description: "The classic combination to achieve O(1) access (Map) and O(1) reordering (Linked List).",
            links: []
        }
    ]
  },

  {
    id: 'trie-autocomplete',
    title: 'Trie for Autocomplete',
    difficulty: 'expert',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '45m',
    description: `**Scenario:** Implement the backend for a search bar autocomplete.

**Task:** Build a \`Trie\` (Prefix Tree).
- \`insert(word)\`: Add a word.
- \`search(prefix)\`: Return all words in the Trie that start with this prefix.`,
    initialCode: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {}
  search(prefix) { return []; }
}

const t = new Trie();
function solution(op) {
  if (op.type === 'insert') t.insert(op.word);
  if (op.type === 'search') return t.search(op.prefix);
}`,
    testCases: [
      { input: { type: 'insert', word: 'apple' }, expected: undefined },
      { input: { type: 'insert', word: 'app' }, expected: undefined },
      { input: { type: 'search', prefix: 'app' }, expected: ['apple', 'app'] } // Order may vary, logic needed
    ],
    concepts: [
        {
            title: "Trie (Prefix Tree)",
            description: "A tree data structure used for efficient retrieval of a key in a large dataset of strings.",
            links: [
                { text: "Trie Data Structure", url: "https://en.wikipedia.org/wiki/Trie" }
            ]
        },
        {
            title: "Autocomplete Systems",
            description: "Tries are the backbone of autocomplete and spell checkers because they allow fast prefix lookups.",
            links: []
        }
    ]
  },

  // --- ALGORITHMS: GRAPHS & TREES (LEETCODE STYLE) ---

  {
    id: 'num-islands',
    title: 'Number of Islands',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '30m',
    description: `**Scenario:** You are analyzing a map of a generated world for a game. The map is a 2D grid where '1' represents land and '0' represents water. We need to count the number of distinct islands (groups of connected '1's).

**Task:** Implement \`countIslands(grid)\`.
- Islands are formed by connecting adjacent lands horizontally or vertically.
- You may assume all four edges of the grid are all surrounded by water.`,
    initialCode: `function solution(grid) {
  let count = 0;
  // DFS or BFS to mark visited lands
  return count;
}`,
    testCases: [
      { 
        input: [
          ["1","1","0","0","0"],
          ["1","1","0","0","0"],
          ["0","0","1","0","0"],
          ["0","0","0","1","1"]
        ], 
        expected: 3 
      }
    ],
    concepts: [
        {
            title: "Depth-First Search (DFS)",
            description: "An algorithm for traversing or searching tree or graph data structures. It starts at the root and explores as far as possible along each branch before backtracking.",
            links: [{ text: "DFS Algorithm", url: "https://en.wikipedia.org/wiki/Depth-first_search" }]
        },
        {
            title: "Flood Fill",
            description: "An algorithm that determines the area connected to a given node in a multi-dimensional array.",
            links: []
        }
    ]
  },
  {
    id: 'shortest-path-matrix',
    title: 'Shortest Path in Binary Matrix',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '35m',
    description: `**Scenario:** A robot needs to navigate a grid from top-left (0,0) to bottom-right (n-1,n-1). The cells containing '1' are obstacles, and '0' are clear paths. The robot can move in 8 directions.

**Task:** Find the length of the shortest clear path. If no path exists, return -1.`,
    initialCode: `function solution(grid) {
  // BFS for shortest path
  return -1;
}`,
    testCases: [
      { input: [[0,1],[1,0]], expected: 2 },
      { input: [[0,0,0],[1,1,0],[1,1,0]], expected: 4 }
    ],
    concepts: [
        {
            title: "Breadth-First Search (BFS)",
            description: "Algorithm for traversing or searching tree or graph data structures. It explores the neighbor nodes first, before moving to the next level neighbors. Ideal for finding shortest paths in unweighted graphs.",
            links: [{ text: "BFS Algorithm", url: "https://en.wikipedia.org/wiki/Breadth-first_search" }]
        }
    ]
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule (Topological Sort)',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '40m',
    description: `**Scenario:** A university needs to validate if a student can finish all courses given a list of prerequisites. Some courses depend on others.

**Task:** Given \`numCourses\` and a list of \`[course, prerequisite]\` pairs, return \`true\` if it is possible to finish all courses (i.e., no circular dependencies), otherwise \`false\`.`,
    initialCode: `function solution({ numCourses, prerequisites }) {
  // Detect cycle in directed graph
  return true;
}`,
    testCases: [
      { input: { numCourses: 2, prerequisites: [[1,0]] }, expected: true },
      { input: { numCourses: 2, prerequisites: [[1,0],[0,1]] }, expected: false }
    ],
    concepts: [
        {
            title: "Topological Sort",
            description: "A linear ordering of vertices such that for every directed edge uv, vertex u comes before v in the ordering. Used for scheduling tasks with dependencies.",
            links: [{ text: "Kahn's Algorithm", url: "https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm" }]
        },
        {
            title: "Cycle Detection",
            description: "Identifying if a graph contains a cycle. If a cycle exists in prerequisites, the courses cannot be completed.",
            links: []
        }
    ]
  },
  {
    id: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '35m',
    description: `**Scenario:** We need to deep copy a network structure where nodes reference their neighbors. Simple shallow copies won't work because they preserve references to the original nodes.

**Task:** Deep copy a connected undirected graph. Each node has a \`val\` and a list of \`neighbors\`.`,
    initialCode: `// Definition for a Node.
// class Node {
//   constructor(val, neighbors) {
//     this.val = val === undefined ? 0 : val;
//     this.neighbors = neighbors === undefined ? [] : neighbors;
//   }
// };

function solution(node) {
  if (!node) return null;
  // Use a Map to track visited/cloned nodes
  return null;
}`,
    testCases: [
      { 
        input: { val: 1, neighbors: [{ val: 2, neighbors: [] }] }, 
        expected: { val: 1, neighbors: [{ val: 2, neighbors: [] }] },
        validator: (res, sys) => res.val === 1 && res.neighbors[0].val === 2 && res !== sys // sys not passed correctly in validator usually, strictly checking structure
      }
    ],
    concepts: [
        {
            title: "Deep Copy vs Shallow Copy",
            description: "A deep copy duplicates everything. A shallow copy duplicates as little as possible. Graphs with cycles require tracking visited nodes to prevent infinite loops during copying.",
            links: []
        },
        {
            title: "Graph Traversal",
            description: "Using BFS or DFS to visit all nodes and copy them.",
            links: []
        }
    ]
  },
  {
    id: 'network-delay',
    title: 'Network Delay Time',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '45m',
    description: `**Scenario:** We send a signal from a source node in a network. Each link has a specific transmission time. We need to know how long it takes for *all* nodes to receive the signal.

**Task:** Given times \`[u, v, w]\` (source, target, time), \`n\` nodes, and starting node \`k\`. Return the time when the last node receives the signal. If unreachable, return -1.`,
    initialCode: `function solution({ times, n, k }) {
  // Dijkstra's Algorithm
  return -1;
}`,
    testCases: [
      { input: { times: [[2,1,1],[2,3,1],[3,4,1]], n: 4, k: 2 }, expected: 2 }
    ],
    concepts: [
        {
            title: "Dijkstra's Algorithm",
            description: "An algorithm for finding the shortest paths between nodes in a graph. It uses a priority queue to greedily select the closest unvisited node.",
            links: [{ text: "Dijkstra's Algorithm", url: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" }]
        },
        {
            title: "Shortest Path Problems",
            description: "Finding a path between two vertices in a graph such that the sum of the weights of its constituent edges is minimized.",
            links: []
        }
    ]
  },
  {
    id: 'max-depth-tree',
    title: 'Max Depth of Binary Tree',
    difficulty: 'easy',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '15m',
    description: `**Scenario:** We need to determine the height of a hierarchical structure (like an organizational chart).

**Task:** Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root to leaf).`,
    initialCode: `function solution(root) {
  // return 0 if !root
  return 0;
}`,
    testCases: [
      { input: { val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } }, expected: 3 }
    ],
    concepts: [
        {
            title: "Tree Traversal (DFS)",
            description: "Recursively calculating height: 1 + max(height(left), height(right)).",
            links: []
        }
    ]
  },
  {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '25m',
    description: `**Scenario:** Our database index is corrupted. We need to verify if the index tree is still a valid Binary Search Tree (BST).

**Task:** Implement a function to check if a binary tree is a valid BST (Left < Root < Right).`,
    initialCode: `function solution(root) {
  // Validate recursively with min/max bounds
  return true;
}`,
    testCases: [
      { input: { val: 2, left: { val: 1 }, right: { val: 3 } }, expected: true },
      { input: { val: 5, left: { val: 1 }, right: { val: 4, left: { val: 3 }, right: { val: 6 } } }, expected: false }
    ],
    concepts: [
        {
            title: "Binary Search Tree Property",
            description: "For every node, all nodes in the left subtree are smaller, and all nodes in the right subtree are larger.",
            links: [{ text: "BST Validation", url: "https://en.wikipedia.org/wiki/Binary_search_tree#Verification" }]
        }
    ]
  },
  {
    id: 'level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '25m',
    description: `**Scenario:** We need to print an org chart level by level (CEO, then VPs, then Managers...).

**Task:** Given a binary tree, return the level order traversal of its nodes' values as an array of arrays.`,
    initialCode: `function solution(root) {
  if (!root) return [];
  const result = [];
  // Use a queue for BFS
  return result;
}`,
    testCases: [
      { input: { val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } }, expected: [[3],[9,20],[15,7]] }
    ],
    concepts: [
        {
            title: "Breadth-First Search (BFS)",
            description: "Processing tree nodes level by level using a Queue.",
            links: []
        }
    ]
  },
  {
    id: 'lca-bst',
    title: 'Lowest Common Ancestor (BST)',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '25m',
    description: `**Scenario:** Finding the closest common manager for two employees in a hierarchy.

**Task:** Given a Binary Search Tree (BST), find the Lowest Common Ancestor (LCA) of two given nodes \`p\` and \`q\`.`,
    initialCode: `function solution({ root, p, q }) {
  // Leverage BST properties
  return null; // return value of LCA node
}`,
    testCases: [
      { input: { root: { val: 6, left: { val: 2 }, right: { val: 8 } }, p: 2, q: 8 }, expected: 6 }
    ],
    concepts: [
        {
            title: "Lowest Common Ancestor",
            description: "The lowest node that has both p and q as descendants.",
            links: [{ text: "LCA Problem", url: "https://en.wikipedia.org/wiki/Lowest_common_ancestor" }]
        }
    ]
  },
  {
    id: 'serialize-tree',
    title: 'Serialize & Deserialize Binary Tree',
    difficulty: 'hard',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '45m',
    description: `**Scenario:** We need to store a tree structure in a file or send it over a network (JSON is easy, but try doing it with a string format).

**Task:** Design an algorithm to serialize a binary tree to a string and deserialize it back to a tree.`,
    initialCode: `const serializer = {
  serialize(root) { return "[]"; },
  deserialize(data) { return null; }
};

function solution(op) {
  if (op.type === 'serialize') return serializer.serialize(op.root);
  if (op.type === 'deserialize') return serializer.deserialize(op.data);
}`,
    testCases: [
      { input: { type: 'serialize', root: { val: 1, left: { val: 2 }, right: { val: 3 } } }, validator: (res) => typeof res === 'string', expected: "valid_string" }
    ],
    concepts: [
        {
            title: "Serialization",
            description: "Converting a data structure into a format that can be stored or transmitted.",
            links: []
        },
        {
            title: "Pre-order Traversal",
            description: "A common way to serialize trees is using Pre-order traversal (Root, Left, Right).",
            links: []
        }
    ]
  },

  // --- ALGORITHMS: SLIDING WINDOW & INTERVALS ---

  {
    id: 'longest-substring-unique',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '30m',
    description: `**Scenario:** String analysis. We need to find the longest sequence of unique characters in a stream.

**Task:** Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    initialCode: `function solution(s) {
  // Sliding window
  return 0;
}`,
    testCases: [
      { input: "abcabcbb", expected: 3 },
      { input: "bbbbb", expected: 1 }
    ],
    concepts: [
        {
            title: "Sliding Window",
            description: "Maintaining a window (subset) of data that moves across the larger dataset. Efficient for subarray/substring problems.",
            links: [{ text: "Sliding Window Technique", url: "https://www.geeksforgeeks.org/window-sliding-technique/" }]
        },
        {
            title: "Hash Set / Map",
            description: "Using a Set to track characters currently in the window for O(1) lookups.",
            links: []
        }
    ]
  },
  {
    id: 'min-subarray-len',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '30m',
    description: `**Scenario:** Financial analysis. Finding the smallest contiguous period where revenue exceeded a target.

**Task:** Given an array of positive integers \`nums\` and a positive integer \`target\`, return the minimal length of a subarray whose sum is greater than or equal to \`target\`. If none, return 0.`,
    initialCode: `function solution({ target, nums }) {
  // Sliding window
  return 0;
}`,
    testCases: [
      { input: { target: 7, nums: [2,3,1,2,4,3] }, expected: 2 }
    ],
    concepts: [
        {
            title: "Dynamic Sliding Window",
            description: "Expand the window until the condition is met, then shrink it from the left to find the minimum size.",
            links: []
        }
    ]
  },
  {
    id: 'permutation-string',
    title: 'Permutation in String',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '35m',
    description: `**Scenario:** Security / Cryptography. Checking if a specific pattern (permutation) exists within a text.

**Task:** Given two strings \`s1\` and \`s2\`, return true if \`s2\` contains a permutation of \`s1\`.`,
    initialCode: `function solution({ s1, s2 }) {
  // Fixed size sliding window
  return false;
}`,
    testCases: [
      { input: { s1: "ab", s2: "eidbaooo" }, expected: true },
      { input: { s1: "ab", s2: "eidboaoo" }, expected: false }
    ],
    concepts: [
        {
            title: "Fixed Size Window",
            description: "The window size is fixed (length of s1). Slide it across s2 and check if character counts match.",
            links: []
        },
        {
            title: "Frequency Map",
            description: "Using an array of size 26 (for 'a'-'z') to compare character frequencies in O(1).",
            links: []
        }
    ]
  },
  {
    id: 'longest-repeating-char',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '40m',
    description: `**Scenario:** Data correction. We can change up to \`k\` characters in a corrupted signal to make it uniform. What is the longest uniform signal we can achieve?

**Task:** Given a string \`s\` and integer \`k\`, return the length of the longest substring containing the same letter you can get after performing at most \`k\` character replacements.`,
    initialCode: `function solution({ s, k }) {
  // Sliding window
  return 0;
}`,
    testCases: [
      { input: { s: "ABAB", k: 2 }, expected: 4 },
      { input: { s: "AABABBA", k: 1 }, expected: 4 }
    ],
    concepts: [
        {
            title: "Optimization",
            description: "Valid window condition: (Window Length) - (Count of Most Frequent Char) <= k.",
            links: []
        }
    ]
  },
  {
    id: 'sliding-window-max',
    title: 'Sliding Window Maximum',
    difficulty: 'hard',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '45m',
    description: `**Scenario:** Real-time analytics. We need the maximum stock price in the last 10 minutes, updated every minute.

**Task:** Given an array \`nums\` and sliding window size \`k\`, return the max sliding window.`,
    initialCode: `function solution({ nums, k }) {
  // Monotonic Queue
  return [];
}`,
    testCases: [
      { input: { nums: [1,3,-1,-3,5,3,6,7], k: 3 }, expected: [3,3,5,5,6,7] }
    ],
    concepts: [
        {
            title: "Monotonic Queue",
            description: "A deque (double-ended queue) that maintains elements in decreasing order. Allows finding the max in O(1) and updating in O(1) amortized.",
            links: [{ text: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/solution/" }]
        }
    ]
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '30m',
    description: `**Scenario:** Calendar management. Merging overlapping meeting times to block out busy slots.

**Task:** Given an array of \`intervals\`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    initialCode: `function solution(intervals) {
  // Sort and merge
  return [];
}`,
    testCases: [
      { input: [[1,3],[2,6],[8,10],[15,18]], expected: [[1,6],[8,10],[15,18]] }
    ],
    concepts: [
        {
            title: "Sorting Intervals",
            description: "Sorting intervals by start time is usually the first step in interval problems.",
            links: []
        }
    ]
  },
  {
    id: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '30m',
    description: `**Scenario:** Scheduling. Adding a new meeting into an existing schedule of non-overlapping meetings, merging if necessary.

**Task:** Given sorted non-overlapping \`intervals\` and a \`newInterval\`, insert \`newInterval\` and merge if needed.`,
    initialCode: `function solution({ intervals, newInterval }) {
  const result = [];
  return result;
}`,
    testCases: [
      { input: { intervals: [[1,3],[6,9]], newInterval: [2,5] }, expected: [[1,5],[6,9]] }
    ],
    concepts: [
        {
            title: "Interval Logic",
            description: "Handling three cases: 1. New interval is before current. 2. New interval is after current. 3. Overlap (merge).",
            links: []
        }
    ]
  },
  {
    id: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '35m',
    description: `**Scenario:** Resource allocation. Removing the minimum number of requests to ensure no two requests overlap.

**Task:** Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.`,
    initialCode: `function solution(intervals) {
  // Greedy approach
  return 0;
}`,
    testCases: [
      { input: [[1,2],[2,3],[3,4],[1,3]], expected: 1 }
    ],
    concepts: [
        {
            title: "Greedy Algorithm",
            description: "Sort by *end time*. Always pick the interval that ends earliest to leave maximum room for subsequent intervals.",
            links: []
        }
    ]
  },
  {
    id: 'meeting-rooms-2',
    title: 'Meeting Rooms II',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '40m',
    description: `**Scenario:** Office Management. Determining how many conference rooms are needed to accommodate a schedule of meetings.

**Task:** Given an array of meeting time intervals, return the minimum number of conference rooms required.`,
    initialCode: `function solution(intervals) {
  // Min-Heap or Line Sweep
  return 0;
}`,
    testCases: [
      { input: [[0, 30],[5, 10],[15, 20]], expected: 2 }
    ],
    concepts: [
        {
            title: "Line Sweep / Chronological Ordering",
            description: "Treat start times as +1 (room needed) and end times as -1 (room freed). Sort all events and track the running sum.",
            links: []
        },
        {
            title: "Min-Heap",
            description: "Using a heap to track end times of meetings currently in progress.",
            links: []
        }
    ]
  },
  {
    id: 'interval-intersections',
    title: 'Interval List Intersections',
    difficulty: 'medium',
    pLevel: 'p3',
    category: 'dsa',
    expectedTime: '35m',
    description: `**Scenario:** Scheduling common free time. Finding the time slots where two people are both available.

**Task:** Given two lists of closed intervals, return the intersection of these two interval lists.`,
    initialCode: `function solution({ firstList, secondList }) {
  // Two pointers
  return [];
}`,
    testCases: [
      { input: { firstList: [[0,2],[5,10]], secondList: [[1,5],[8,12]] }, expected: [[1,2],[5,5],[8,10]] }
    ],
    concepts: [
        {
            title: "Two Pointers",
            description: "Iterate through both lists simultaneously. Intersection logic: max(start1, start2) to min(end1, end2).",
            links: []
        }
    ]
  }
];