import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase = createClient(
    'https://utrhucinkqvzqwdxilxf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cmh1Y2lua3F2enF3ZHhpbHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwNDY0MDIsImV4cCI6MjAwMDYyMjQwMn0.Cny_GUowrahL9lSjf0_CL3BVt3Vr-p3_grJCz1GFhLM',
  );

  async signUp(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user?.identities?.length === 0) {
        throw 'User already registered';
      }

      return data.user;
    } catch (error) {
      throw error;
    }
  }
}