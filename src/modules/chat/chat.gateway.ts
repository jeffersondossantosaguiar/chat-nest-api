import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

let users = [];

const addUser = (_id, socketId) => {
  !users.some(user => user._id === _id) &&
    users.push({ _id, socketId });
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    users.splice(index, 1);
  }
};

const getUser = (_id) => {
  const user = users.find((user) => user._id === _id);
  return user;
};

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('addUser')
  handleConnection(
    client: Socket,
  ) {
    client.on("addUser", _id => {
      console.log("a user was connected " + "USER ID: " + _id + " CLIENT ID: " + client.id);
      addUser(_id, client.id);
      this.wss.emit("getUsers", users);
    });
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(
    client: Socket,
  ) {
    console.log("a user was disconnected");
    removeUser(client.id);
    this.wss.emit("getUsers", users);
  }

  @SubscribeMessage('sendMessage')
  handleDirectMessage(
    client: Socket,
    message: { senderId: string, receiverId: string, text: string; }
  ) {
    const user = getUser(message.receiverId);
    console.log("sendMessage", user);
    this.wss.to(user.socketId).emit("getMessage", {
      senderId: message.senderId,
      text: message.text
    });
  }
  /* 
    @UseGuards(WsAuthGuard)
    @SubscribeMessage('chatToServer')
    handleMessage(
      client: Socket,
      message: { sender: string; room: string; message: string; },
    ) {
      console.log(message);
      this.wss.to(message.room).emit('chatToClient', message);
    }
  
    @UseGuards(WsAuthGuard)
    @SubscribeMessage('joinRoom')
    handleRoomJoin(client: Socket, room: string) {
      client.join(room);
      client.emit('joinedRoom', room);
    }
  
    @UseGuards(WsAuthGuard)
    @SubscribeMessage('leaveRoom')
    handleRoomLeave(client: Socket, room: string) {
      client.leave(room);
      client.emit('leftRoom', room);
    } */
}
