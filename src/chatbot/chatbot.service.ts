import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthStrategy, Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class ChatbotService implements OnModuleInit {
  private client: Client;

  onModuleInit() {
    this.initializeWhatsApp();
  }

  private initializeWhatsApp() {
    this.client = new Client({ authStrategy: new LocalAuth() });
    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });
    this.client.on('ready', () => {
      console.log('Bot de WhatsApp listo');
    });
    this.client.on('message', (msg) => {
      this.handleMessage(msg);
    });

    this.client.initialize();
  }

  private handleMessage(message) {
    const { from, body } = message;
    let stringg = 'Hola como vas';
    let palabras = stringg.toLowerCase().split(' ');
    palabras.forEach((e) =>
      e === 'hola'
        ? this.client.sendMessage(from, '¡Hola! ¿Cómo puedo ayudarte?')
        : false,
    );
    if (body === 'Como vas?') {
      this.client.sendMessage(
        from,
        'Estoy bien, gracias por preguntar. ¿Necesitas algo más?',
      );
    }
  }
}
