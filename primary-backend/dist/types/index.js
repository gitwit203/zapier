"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapCreateSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignUpSchema = zod_1.default.object({
    username: zod_1.default.string().min(3),
    password: zod_1.default.string().min(8),
    name: zod_1.default.string(),
});
exports.SignInSchema = zod_1.default.object({
    username: zod_1.default.string().min(3),
    password: zod_1.default.string().min(8),
});
//zap schema
exports.ZapCreateSchema = zod_1.default.object({
    availableTriggerID: zod_1.default.string(),
    triggerMetaData: zod_1.default.any().optional(), //since metadata can vary vastly for different triggers hence the any
    actions: zod_1.default.array(zod_1.default.object({
        availableActionID: zod_1.default.string(),
        actionMetaData: zod_1.default.any().optional(),
    }))
});
