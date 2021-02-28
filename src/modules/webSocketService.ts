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

   public openEvent(callback : (event: any) => void) {
     this.subscribe('open', callback);
   }

   public closeEvent(callback : (event: any) => void) {
     this.subscribe('close', callback);
   }

   public errorEvent(callback : (event: any) => void) {
     this.subscribe('error', callback);
   }

   public messageEvent(callback : (event: any) => void) {
     this.subscribe('message', callback);
   }

   public getOldMessage(content : number) {
     this.send({content: content, type: 'get old'});
   }

   public sendMessage(message: string) {
     this.send({content: message, type: 'message'});
   }

   private send(message: any) {
     this.webSocketService.send(
         JSON.stringify(message));
   }

   private subscribe(topic: string, callback: (event: any) => void) {
     this.webSocketService.addEventListener(topic, (event) =>{
       callback(event);
     });
   }
}
