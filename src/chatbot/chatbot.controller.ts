import { Controller, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}
  @Get('qr')
  getQrcode() {
    return { message: 'Escanea el codigo' };
  }
}
