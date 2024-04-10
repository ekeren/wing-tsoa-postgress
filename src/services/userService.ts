import { Pool, PoolConfig } from 'pg';
import { IPartialUser, IUser } from '../target/models/user';


var pool: Pool
export const setPool = (config: PoolConfig) => {
  if (!pool) {
    console.log("setting pool");
    pool = new Pool(config);
  }
};

export class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT id, name, email FROM users');
      return res.rows;
    } finally {
      client.release();
    }
  }

  public async createUser(user: IPartialUser): Promise<IUser> {
    const client = await pool.connect();
    try {
      const { name, email } = user;
      const res = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
      return res.rows[0];
    } finally {
      client.release();
    }
  }

  public async updateUser(id: number, user: Partial<IUser>): Promise<IUser> {
    const client = await pool.connect();
    try {
      const { name, email } = user;
      const res = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
      return res.rows[0];
    } finally {
      client.release();
    }
  }

  public async deleteUser(id: number): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM users WHERE id = $1', [id]);
    } finally {
      client.release();
    }
  }
}
