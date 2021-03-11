import { Controller, Get, Route } from "tsoa";

@Route("ping")
export class PingController extends Controller {
    @Get()
    public ping(): string {
        return "pong";
    }
}
