import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  async uploadFile(bucketName: string, filePath: string, file: Buffer, mimeType: string) {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        contentType: mimeType,
        upsert: true
      });

    if (error) throw error;
    return data;
  }

  async downloadFile(bucketName: string, filePath: string) {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .download(filePath);

    if (error) throw error;
    return data;
  }

  async deleteFile(bucketName: string, filePath: string) {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) throw error;
    return data;
  }

  async getPublicUrl(bucketName: string, filePath: string) {
    const { data } = this.supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return data;
  }
}