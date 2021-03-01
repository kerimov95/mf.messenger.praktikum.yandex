export class WebSocketService {
   private webSocketService: WebSocket;
   private url: string;

   constructor(userId: number, chatId: number, token: string) {
     this.url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
     this.webSocketService = new WebSocket(this.url);
   }

   public check() : boolean {
     if ( this.webSocketService.readyState === 1) {
       return true;
     } else return false;
   }

   public close() {
     this.webSocketService.close();
   }

   public send(message: {content: any, type: string}) {
     this.webSocketService.send(
         JSON.stringify(message));
   }

   public subscribe(topic: string, callback: (event: any) => void) {
     this.webSocketService.addEventListener(topic, (event) =>{
       callback(event);
     });
   }

   public unSubscribe(topic: string, callback: (event: any) => void) {
     this.webSocketService.removeEventListener(topic, (event) =>{
       callback(event);
     });
   }
}
