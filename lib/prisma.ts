import { PrismaClient } from "@prisma/client";

export class PrismaService {
  private static instance: PrismaClient;

  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient();
    }

    return PrismaService.instance;
  }
}
