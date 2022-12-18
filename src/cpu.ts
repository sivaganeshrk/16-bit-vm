import { createMemory } from "./memory";
import { DynamicObject } from "./types";
import instructions from "./instructions";

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

  fetch() {
    const nextInstructionAddress = this.getRegister("ip");
    const instruction = this.memory.getUint8(nextInstructionAddress);
    this.setRegister("ip", nextInstructionAddress + 1);
    return instruction;
  }

  fetch16() {
    const nextInstructionAddress = this.getRegister("ip");
    const instruction = this.memory.getUint16(nextInstructionAddress);
    this.setRegister("ip", nextInstructionAddress + 1);
    return instruction;
  }

  execute(instruction: number) {
    switch (instruction) {
      // Move literal into the r1 register
      case instructions.MOV_LIT_R1: {
        const literal = this.fetch16();
        this.setRegister("r1", literal);
        return;
      }
      // Move literal into the r2 register
      case instructions.MOV_LIT_R2: {
        const literal = this.fetch16();
        this.setRegister("r2", literal);
        return;
      }
      // Add register to register
      case instructions.ADD_REG_REG: {
        const r1 = this.fetch();
        const r2 = this.fetch();
        const registerValue1 = this.registers.getUint16(r1 * 2);
        const registerValue2 = this.registers.getUint16(r2 * 2);
        this.setRegister("acc", registerValue1 + registerValue2);
        return;
      }
    }
  }

  step() {
    const instruction = this.fetch();
    return this.execute(instruction);
  }
}
