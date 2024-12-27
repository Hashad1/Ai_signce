# Supabase Integration Guide

## 1. Initial Setup

### Prerequisites
- Node.js 14+
- Next.js project
- Supabase project (automatically configured)

### Installation
```bash
npm install @supabase/supabase-js
```

### Environment Variables
Required in `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 2. Authentication

### Basic Usage
```typescript
import { signIn, signUp, signOut } from '@/lib/supabase/auth';

// Sign up
await signUp(email, password, fullName);

// Sign in
await signIn(email, password);

// Sign out
await signOut();
```

### Auth Hook
```typescript
import { useAuth } from '@/lib/supabase/hooks/useAuth';

function MyComponent() {
  const { user, loading } = useAuth();
  // Use user data
}
```

## 3. Database Operations

### Querying Data
```typescript
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', 'value');
```

### Inserting Data
```typescript
const { data, error } = await supabase
  .from('table_name')
  .insert({ column: 'value' })
  .select();
```

### Updating Data
```typescript
const { data, error } = await supabase
  .from('table_name')
  .update({ column: 'new_value' })
  .eq('id', record_id)
  .select();
```

## 4. Real-time Subscriptions

### Using the Real-time Hook
```typescript
import { useRealtime } from '@/lib/supabase/hooks/useRealtime';

function ChatComponent() {
  useRealtime('room1', 'new_message', (payload) => {
    // Handle new message
  });
}
```

### Message Subscription
```typescript
import { subscribeToMessages } from '@/lib/supabase/api/messages';

const subscription = subscribeToMessages(sessionId, (message) => {
  // Handle new message
});
```

## 5. Storage Management

### File Operations
```typescript
import { uploadFile, getPublicUrl, deleteFile } from '@/lib/supabase/api/storage';

// Upload
await uploadFile('bucket', 'path/file.png', file);

// Get URL
const url = await getPublicUrl('bucket', 'path/file.png');

// Delete
await deleteFile('bucket', 'path/file.png');
```

## 6. Security Best Practices

1. **Row Level Security (RLS)**
   - Always enable RLS on tables
   - Create specific policies for each operation
   - Test policies thoroughly

2. **Authentication**
   - Use middleware for protected routes
   - Implement proper session management
   - Handle auth state changes

3. **Data Validation**
   - Validate input on client and server
   - Use TypeScript for type safety
   - Implement proper error handling

## 7. Performance Tips

1. **Queries**
   - Use specific column selection
   - Implement pagination
   - Use appropriate indexes

2. **Real-time**
   - Limit subscription scope
   - Clean up subscriptions
   - Use filters in subscriptions

3. **Storage**
   - Implement file size limits
   - Use appropriate cache controls
   - Clean up unused files

## 8. Testing

1. **Unit Tests**
   - Test hooks in isolation
   - Mock Supabase client
   - Test error handling

2. **Integration Tests**
   - Test complete flows
   - Use test database
   - Reset state between tests

3. **E2E Tests**
   - Test critical paths
   - Include auth flows
   - Test real-time features