import { Command } from "commander";
const program = new Command();

program
  .option(" -p <port>", "server port", 8080)
  .option("--mode <mode>", "working mode", "development");

program.parse();

export default program;
