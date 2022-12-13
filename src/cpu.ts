import { createMemory } from "./memory";
import { DynamicObject } from "./types";

export class CPU {
  memory: DataView;
  registerNames: string[];
  registers: DataView;
  registerMap: DynamicObject;
  constructor(memory: DataView) {
    this.memory = memory;

    this.registerNames = [
      "ip",
      "acc",
      "r1",
      "r2",
      "r3",
      "r4",
      "r5",
      "r6",
      "r7",
      "r8",
    ];

    this.registers = createMemory(this.registerNames.length * 2);

    this.registerMap = this.registerNames.reduce(
      (map: DynamicObject, name: string, index) => {
        map[name] = index * 2;
        return map;
      },
      {}
    );
  }

  getRegister(name: string) {
    if (!(name in this.registerMap)) {
      throw new Error(`getRegister: No such register '${name}'`);
    }

    return this.registers.getUint16(this.registerMap[name]);
  }

  setRegister(name: string, value: number) {
    if (!(name in this.registerMap)) {
      throw new Error(`getRegister: No such register '${name}'`);
    }

    return this.registers.setUint16(this.registerMap[name], value);
  }
}
