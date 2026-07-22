export class MessageKeyDto {
  remoteJid: string;
  fromMe: boolean;
  id: string;
}

export class MessageContentDto {
  conversation?: string;
  extendedTextMessage?: { text: string };
  imageMessage?: { caption?: string; mimetype: string };
  documentMessage?: { caption?: string; fileName: string; mimetype: string };
  audioMessage?: { mimetype: string; seconds: number };
  locationMessage?: { degreesLatitude: number; degreesLongitude: number };
  contactMessage?: { displayName: string };
  listResponseMessage?: { singleSelectReply: { selectedRowId: string } };
  buttonsResponseMessage?: { selectedButtonId: string };
  templateButtonReplyMessage?: { selectedId: string };
}

export class MessageDataDto {
  key: MessageKeyDto;
  pushName: string;
  status: string;
  message: MessageContentDto;
  messageType: string;
  messageTimestamp: number;
  instanceId?: string;
  source?: string;
}

export class ConnectionDataDto {
  instance: string;
  state: 'open' | 'close' | 'connecting';
}

export class WhatsappEventDto {
  event: string;
  instance: string;
  data: MessageDataDto | ConnectionDataDto | Record<string, unknown>;
  destination?: string;
  date_time?: string;
  sender?: string;
  server_url?: string;
  apikey?: string;
}
