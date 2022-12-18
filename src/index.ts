import { CPU } from "./cpu";
import { createMemory } from "./memory";
import instructions from "./instructions";

const memory = createMemory(256);
const writableBytes = new Uint8Array(memory.buffer);
const cpu = new CPU(memory);

writableBytes[0] = instructions.MOV_LIT_R1;
writableBytes[1] = 0x12; //0x1234
writableBytes[2] = 0x34;

writableBytes[3] = instructions.MOV_LIT_R2;
writableBytes[4] = 0xab; //0xabcd
writableBytes[5] = 0xcd;

writableBytes[6] = instructions.ADD_REG_REG;
writableBytes[7] = 2; //r1 index
writableBytes[8] = 3; //r2 index

cpu.debug();

cpu.step();
cpu.debug();

cpu.step();
cpu.debug();

cpu.step();
cpu.debug();
