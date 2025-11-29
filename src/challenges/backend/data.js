export const backendChallenges = [
  // --- FOUNDATIONAL / ALGORITHMIC CHALLENGES (EASY) ---
  {
    id: 'normalize-data',
    title: 'Data Normalization',
    difficulty: 'easy',
    pLevel: 'p0',
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
    ]
  },
  {
    id: 'pagination',
    title: 'Pagination Helper',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '15m',
    description: `**Scenario:** The 'All Products' API endpoint is crashing browsers because it tries to return 10,000 items in a single request. We need to implement server-side pagination immediately.

**Task:** Create a reusable pagination helper function. It should accept an array of items, a page number, and a page size. It must return the specific slice of data for that page, along with metadata (total items, total pages, current page) so the frontend can render the pagination controls.`,
    initialCode: `function solution({ items, page, pageSize }) { return { data: [], meta: {} }; }`,
    testCases: [{ input: { items: [1,2,3], page: 1, pageSize: 2 }, expected: { data: [1,2], meta: { total: 3, totalPages: 2, currentPage: 1 } } }]
  },
  {
    id: 'file-system',
    title: 'Virtual File System',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '25m',
    description: `**Scenario:** We are building a web-based IDE (like this one!) and need a lightweight in-memory file system to store the user's code before it's saved to the cloud.

**Task:** Implement a simple class or function that handles a stream of file operations: \`WRITE\` (create/update a file) and \`READ\` (retrieve content). The system should start empty and return the result of read operations.`,
    initialCode: `function solution(commands) { return []; }`,
    testCases: [{ input: [["WRITE", "a", "b"], ["READ", "a"]], expected: ["b"] }]
  },
  {
    id: 'log-parser',
    title: 'Log Aggregator',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '20m',
    description: `**Scenario:** The SRE team needs a quick dashboard to see how many errors are occurring in production. They are sending us a raw stream of log messages.

**Task:** Parse a multiline string of log entries (e.g., "INFO User logged in", "ERROR DB Connection failed") and return an object counting the occurrences of each log level (INFO, WARN, ERROR).`,
    initialCode: `function solution(logs) { return {}; }`,
    testCases: [{ input: "INFO A\nERROR B", expected: { INFO: 1, ERROR: 1 } }]
  },
  {
    id: 'cache-ttl',
    title: 'In-Memory Cache with TTL',
    difficulty: 'easy',
    pLevel: 'p1',
    expectedTime: '20m',
    description: `**Scenario:** To reduce load on our primary database, we need to cache user session data. However, sessions must expire automatically for security.

**Task:** Implement a key-value cache store that supports \`SET\` (with a Time-To-Live in seconds), \`GET\` (return null if expired), and a simulated \`WAIT\` command to advance time during testing.`,
    initialCode: `function solution(cmds) { return []; }`,
    testCases: [{ input: [["SET","A",1,5],["GET","A"]], expected: [null, 1] }]
  },
  {
    id: 'event-emitter',
    title: 'Simple Event Emitter',
    difficulty: 'easy',
    pLevel: 'p1',
    expectedTime: '25m',
    description: `**Scenario:** We are decoupling our monolithic application. Different modules need to communicate without importing each other directly.

**Task:** Build a basic Event Bus. It should support subscribing to events (\`ON\`), triggering them (\`EMIT\`), and unsubscribing (\`OFF\`). When an event is emitted, all active callbacks for that event name should be invoked with the data.`,
    initialCode: `function solution(cmds) { return []; }`,
    testCases: [{ input: [["ON","a","1"],["EMIT","a","b"]], expected: ["1: b"] }]
  },
  {
    id: 'deep-merge',
    title: 'Config Deep Merger',
    difficulty: 'easy',
    pLevel: 'p1',
    expectedTime: '20m',
    description: `**Scenario:** Our service has a \`default-config.json\` and customers provide a \`user-overrides.json\`. We need to combine them so that user settings override defaults, but without losing nested default settings that weren't overridden.

**Task:** Implement a deep merge function that recursively merges two objects.`,
    initialCode: `function solution(args) { return {}; }`,
    testCases: [{ input: [{a:1}, {b:2}], expected: {a:1, b:2} }]
  },
  {
    id: 'url-parser',
    title: 'URL Query Parser',
    difficulty: 'easy',
    pLevel: 'p1',
    expectedTime: '15m',
    description: `**Scenario:** Marketing needs to track campaign clicks. The incoming HTTP requests contain UTM parameters in the query string (e.g., \`?source=google&campaign=spring_sale\`).

**Task:** Write a function that parses a full URL string and returns a key-value object of all query parameters.`,
    initialCode: `function solution(url) { return {}; }`,
    testCases: [{ input: "http://a.com?b=1", expected: {b:"1"} }]
  },
  {
    id: 'middleware-chain',
    title: 'Middleware Chain',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '25m',
    description: `**Scenario:** We are building a micro-framework similar to Express.js. We need a way to run a request through a sequence of middleware functions (authentication, logging, body parsing) before handling it.

**Task:** Implement a function that takes a list of middleware tasks and executes them in order. Each task receives the data and modifies it for the next one.`,
    initialCode: `async function solution(mw) { return 0; }`,
    testCases: [{ input: ["ADD 1"], expected: 1 }]
  },
  {
    id: 'dedup-transactions',
    title: 'Deduplicate Transactions',
    difficulty: 'easy',
    pLevel: 'p2',
    expectedTime: '20m',
    description: `**Scenario:** Our payment provider sometimes sends the same webhook event twice (at-least-once delivery). If we process it twice, we charge the customer twice.

**Task:** Given a stream of transaction objects, filter out duplicates. If a transaction ID appears multiple times, keep only the one with the latest timestamp.`,
    initialCode: `function solution(txs) { return []; }`,
    testCases: [{ input: [{id:1, t:1}], expected: [{id:1, t:1}] }]
  },
  {
    id: 'inventory-update',
    title: 'Inventory Update',
    difficulty: 'easy',
    pLevel: 'p2',
    expectedTime: '20m',
    description: `**Scenario:** A fresh shipment of products has arrived at the warehouse. We need to update our current inventory counts with the new delivery manifest.

**Task:** Write a function that takes the current inventory object and a delivery object (both mapping ItemSKU -> Count) and returns the new total inventory.`,
    initialCode: `function solution({current, delivery}) { return {}; }`,
    testCases: [{ input: {current:{a:1}, delivery:{a:1}}, expected: {a:2} }]
  },
  {
    id: 'find-missing',
    title: 'Find Missing ID',
    difficulty: 'easy',
    pLevel: 'p2',
    expectedTime: '15m',
    description: `**Scenario:** We process orders sequentially. An alert fired saying that an Order ID is missing from the sequence, indicating a potential data loss or failed transaction.

**Task:** Given a list of sorted Order IDs (integers), find the one missing number in the sequence so we can investigate.`,
    initialCode: `function solution(ids) { return 0; }`,
    testCases: [{ input: [1,3], expected: 2 }]
  },
  {
    id: 'sql-generator',
    title: 'Simple SQL Generator',
    difficulty: 'easy',
    pLevel: 'p2',
    expectedTime: '20m',
    description: `**Scenario:** We are building a lightweight internal ORM (Object-Relational Mapper). We need a utility to generate raw SQL queries from a JavaScript configuration object.

**Task:** Implement a function that takes a table name and an ID, and returns a valid \`SELECT\` SQL string.`,
    initialCode: `function solution({table, id}) { return ""; }`,
    testCases: [{ input: {table:"a", id:1}, expected: "SELECT * FROM a WHERE id = 1" }]
  },
  {
    id: 'obj-flattener',
    title: 'Object Flattener',
    difficulty: 'medium',
    pLevel: 'p2',
    expectedTime: '25m',
    description: `**Scenario:** The Data Science team asks for a CSV export of our user data. However, our data is stored in MongoDB as complex nested objects. CSVs require flat columns.

**Task:** Write a function that flattens a nested object into a single-level object using dot notation for keys (e.g., \`{ user: { name: 'A' } }\` becomes \`{ "user.name": "A" }\`).`,
    initialCode: `function solution(obj) { return {}; }`,
    testCases: [{ input: {a:{b:1}}, expected: {"a.b":1} }]
  },

  // --- SYSTEM DESIGN CHALLENGES (MEDIUM/HARD) ---
  {
    id: 'rate-limiter',
    title: 'API Rate Limiter',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '20m',
    description: `**Scenario:** A malicious bot is spamming our public login endpoint, trying to brute-force passwords. This is degrading performance for legitimate users.

**Task:** Implement a Rate Limiter function \`isAllowed(userId)\`. It should allow a maximum of 5 requests per minute per user. If a user exceeds this, return \`false\` (block them).`,
    initialCode: `async function solution(id) { return true; }`,
    testCases: [{ input: "u1", expected: true }]
  },
  {
    id: 'load-balancer-simulation',
    title: 'Load Balancer Strategy',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '30m',
    description: `**Scenario:** We have 3 backend servers. Currently, we send all traffic to Server 1 until it crashes. We need a smarter distribution strategy.

**Task:** Implement a "Weighted Round Robin" load balancer. It should distribute incoming requests across the node pool based on a simple rotation, or optionally based on server capacity (weights).`,
    initialCode: `function solution(n) { return []; }`,
    testCases: [{ input: 4, expected: ["node-1", "node-1", "node-2", "node-3"] }]
  },
  {
    id: 'job-queue-processor',
    title: 'Async Job Queue Processor',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '35m',
    description: `**Scenario:** Sending emails is slow. If we send them during the user's HTTP request, the page hangs. We need to offload this to a background worker.

**Task:** Implement a worker that continuously polls a job queue. When a job appears (e.g., "send_email"), process it asynchronously. Ensure that if processing fails, the job is not lost (simulating retry logic is a plus).`,
    initialCode: `async function solution(cmd) { return 0; }`,
    testCases: [{ input: "start", validator: () => true }]
  },
  {
    id: 'caching-strategy',
    title: 'Write-Through Cache',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '30m',
    description: `**Scenario:** Our User Profile service is read-heavy (90% reads). We want to add a caching layer. However, we must ensure that when a user updates their profile, the cache doesn't serve stale data.

**Task:** Implement a "Write-Through" strategy: When writing data, update *both* the DB and the Cache. When reading, check Cache first; if missing (cache miss), load from DB and populate Cache ("Read-Aside").`,
    initialCode: `async function solution(op) { return null; }`,
    testCases: [{ input: {action:'read', id:1}, expected: null }]
  },
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker Pattern',
    difficulty: 'hard',
    pLevel: 'p2',
    expectedTime: '45m',
    description: `**Scenario:** Our application relies on a third-party "Payment Gateway" API. Sometimes this API goes down or becomes extremely slow. When this happens, our threads pile up waiting for it, eventually crashing *our* server (Cascading Failure).

**Task:** Implement a Circuit Breaker. It should wrap the API calls. If failures exceed a threshold, the breaker "trips" (OPEN state) and immediately fails subsequent calls without hitting the external API, allowing the system to recover. After a timeout, it tries again (HALF-OPEN).`,
    initialCode: `function solution(calls) { return []; }`,
    testCases: [{ input: [false], expected: ["fail"] }]
  },
  {
    id: 'distributed-lock',
    title: 'Distributed Lock Simulation',
    difficulty: 'hard',
    pLevel: 'p2',
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
    ]
  },

  // --- MULTI-STEP SYSTEM DESIGN CHALLENGES (COMPLEX) ---

  {
    id: 'microservice-saga',
    title: 'Distributed Order Saga',
    difficulty: 'hard',
    pLevel: 'p2',
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
    ]
  },

  {
    id: 'log-pipeline',
    title: 'Log Aggregation Pipeline',
    difficulty: 'hard',
    pLevel: 'p2',
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
    ]
  },

  {
    id: 'sharded-db',
    title: 'Sharded Database Proxy',
    difficulty: 'hard',
    pLevel: 'p2',
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
    ]
  },

  {
    id: 'ride-sharing',
    title: 'Galactic Ride Dispatcher',
    difficulty: 'hard',
    pLevel: 'p2',
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
    ]
  },

  {
    id: 'code-collab',
    title: 'Collaborative Code Editor',
    difficulty: 'hard',
    pLevel: 'p2',
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
    ]
  },

  {
    id: 'fintech-ledger',
    title: 'Crypto Exchange Ledger',
    difficulty: 'hard',
    pLevel: 'p2',
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
    ]
  },

  {
    id: 'sharded-counter',
    title: 'High-Throughput Sharded Counter',
    difficulty: 'expert',
    pLevel: 'p3',
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
    ]
  },

  {
    id: 'consistent-hashing',
    title: 'Consistent Hashing Ring',
    difficulty: 'expert',
    pLevel: 'p3',
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
    ]
  },

  {
    id: 'two-phase-commit',
    title: 'Two-Phase Commit (2PC)',
    difficulty: 'expert',
    pLevel: 'p3',
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
    ]
  }
];
