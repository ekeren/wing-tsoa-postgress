import { Body, Controller, Delete, Get, Middlewares, Path, Post, Put, Route, Tags } from 'tsoa';
import { IUser, IPartialUser } from '../target/models/user';
import { UserService, setPool } from '../services/userService';
import { Request, NextFunction, Response  } from "express";
import { getClient } from "@winglibs/tsoa/clients.js";

async function injectionMiddleware(req: Request, res: Response, next: NextFunction) {
  let db = getClient(req, "db");
  let connectionOptions = await db.connectionOptions()
  setPool(connectionOptions);
  next();
}

@Route('users')
@Tags('User')
@Middlewares(injectionMiddleware)
export class UserController extends Controller {
  @Get('/')
  public async getAllUsers(): Promise<IUser[]> {
    console.log("get all users");
    return new UserService().getAllUsers();
  }

  @Post('/')
  public async createUser(@Body() user: IPartialUser): Promise<IUser> {
    console.log("Create User");
    return new UserService().createUser(user);
  }


  @Put('/{id}')
  public async updateUser(@Path() id: number, @Body() user: IUser): Promise<IUser> {
    console.log("Update User");
    return new UserService().updateUser(id, user);
  }

  @Delete('/{id}')
  public async deleteUser(@Path() id: number): Promise<void> {
    console.log("Delete User");
    await new UserService().deleteUser(id);
  }
}
