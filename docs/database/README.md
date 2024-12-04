# Documentation Technique Supabase - Pizza Délice

## 1. Structure de la Base de Données

### 1.1 Tables Principales

#### Users
- **Description** : Gestion des utilisateurs et leurs rôles
- **Colonnes** :
  ```sql
  id UUID PK
  email TEXT UNIQUE
  full_name TEXT
  phone TEXT
  address TEXT
  role TEXT CHECK (IN ('admin', 'pizzeria', 'client'))
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
  ```

#### Pizzas
- **Description** : Catalogue des pizzas disponibles
- **Colonnes** :
  ```sql
  id BIGSERIAL PK
  name TEXT
  description TEXT
  image_url TEXT
  category TEXT
  vegetarian BOOLEAN
  ingredients TEXT[]
  price_small DECIMAL(10,2)
  price_medium DECIMAL(10,2)
  price_large DECIMAL(10,2)
  active BOOLEAN
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
  ```

#### Orders
- **Description** : Commandes des clients
- **Colonnes** :
  ```sql
  id BIGSERIAL PK
  user_id UUID FK >- users.id
  status TEXT CHECK (IN ('en_attente', 'confirmee', 'en_preparation', 'prete', 'recuperee'))
  total DECIMAL(10,2)
  created_at TIMESTAMPTZ
  confirmed_at TIMESTAMPTZ
  preparation_at TIMESTAMPTZ
  ready_at TIMESTAMPTZ
  estimated_ready_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
  ```

### 1.2 Tables de Liaison

#### Order Items
- **Description** : Détails des pizzas dans une commande
- **Relations** : 
  - orders (1-n)
  - pizzas (n-1)
- **Colonnes** :
  ```sql
  id BIGSERIAL PK
  order_id BIGINT FK >- orders.id
  pizza_id BIGINT FK >- pizzas.id
  size TEXT CHECK (IN ('small', 'medium', 'large'))
  quantity INTEGER CHECK (> 0)
  unit_price DECIMAL(10,2)
  removed_ingredients TEXT[]
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
  ```

## 2. Sécurité RLS

### 2.1 Politiques Globales

#### Users
```sql
-- Lecture
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin and pizzeria can view all users"
  ON users FOR SELECT
  USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));

-- Modification
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

#### Orders
```sql
-- Lecture
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Admin and pizzeria can view all orders"
  ON orders FOR SELECT
  USING (auth.jwt() ->> 'role' IN ('admin', 'pizzeria'));

-- Création
CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);
```

## 3. Synchronisation Temps Réel

### 3.1 Configuration des Canaux

#### Canal Orders
```typescript
// Côté client
const ordersSubscription = supabase
  .channel('orders')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'orders'
    },
    (payload) => {
      // Gérer les mises à jour
    }
  )
  .subscribe();
```

### 3.2 Événements à Surveiller

#### Commandes
- Création nouvelle commande
- Changement de statut
- Mise à jour des temps estimés

```typescript
// Exemple de gestion des événements
const handleOrderChange = (payload: any) => {
  const { eventType, new: newRecord } = payload;
  
  switch (eventType) {
    case 'INSERT':
      // Nouvelle commande
      break;
    case 'UPDATE':
      // Mise à jour statut/temps
      break;
  }
};
```

## 4. Exemples d'Implémentation

### 4.1 Création d'une Commande

```typescript
const createOrder = async (order: OrderInsert) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

### 4.2 Mise à Jour du Statut

```typescript
const updateOrderStatus = async (
  orderId: number,
  status: OrderStatus
) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

### 4.3 Récupération des Commandes en Cours

```typescript
const getActiveOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:users(full_name, phone),
      items:order_items(
        quantity,
        unit_price,
        pizza:pizzas(name)
      )
    `)
    .in('status', ['en_attente', 'confirmee', 'en_preparation'])
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};
```

## 5. Bonnes Pratiques

1. **Sécurité**
   - Toujours utiliser les politiques RLS
   - Valider les données côté serveur
   - Ne jamais exposer de données sensibles

2. **Performance**
   - Indexer les colonnes fréquemment utilisées
   - Optimiser les requêtes avec des jointures
   - Limiter le nombre de souscriptions en temps réel

3. **Maintenance**
   - Documenter les modifications de schéma
   - Utiliser des migrations pour les changements
   - Maintenir les types TypeScript à jour