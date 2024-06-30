type connectionCallbackType = (status: "online" | "offline") => void;

export default class EpsonPrinter {
  private device: any;
  private instruction:
    | "isOnline"
    | "paperEnd"
    | "paperNearEnd"
    | "print"
    | null;
  private status: "online" | "offline" | "connecting";

  private connectionCallback: connectionCallbackType | null = null;

  constructor(ipAddress: string, connectionCallback: connectionCallbackType) {
    this.device = new window.epson.ePOSPrint(
      `http://${ipAddress}/cgi-bin/epos/service.cgi?devid=local_printer&timeout=2000`
    );
    this.instruction = null;
    this.status = "offline";
    // Setting Device Handlers
    this.device.ononline = this.onOnline;
    this.device.onoffline = this.onOffline;
    this.device.onpoweroff = this.onOffline;
    // Connecting to printer
    this.connect(connectionCallback);
  }

  public connect(callback: connectionCallbackType) {
    console.log("Connecting to printer...");
    this.status = "connecting";
    this.instruction = "isOnline";
    this.connectionCallback = callback;
    this.device.send();
  }

  private onOnline = () => {
    console.log("Printer is online");
    if (this.instruction === "isOnline" && this.connectionCallback) {
      this.status = "online";
      this.connectionCallback("online");
    }
  };

  private onOffline = () => {
    console.log("Printer is offline");
    if (this.instruction === "isOnline" && this.connectionCallback)
      this.connectionCallback("offline");
  };

  public printTicket = () => {
    if (this.status === "offline") {
      throw new Error("Cannot print with printer offline");
    }

    var builder = new window.epson.ePOSBuilder();
    builder.addTextAlign(builder.ALIGN_CENTER);
    builder.addTextStyle(false, false, true, builder.COLOR_1);
    builder.addText("Print Ticket Succesfully!\n");
    builder.addFeedLine(3);
    builder.addCut(builder.CUT_FEED);

    this.device.send(builder.toString());
  };
}
