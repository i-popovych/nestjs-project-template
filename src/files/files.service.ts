import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try { 
      const fileName = uuid.v4() + '.' + file.originalname.split('.').pop();
      const filePath = path.resolve(__dirname, "..", "static");

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch {
      throw new InternalServerErrorException(
        "An error occurred while trying to save a file"
      );
    }
  }
}
