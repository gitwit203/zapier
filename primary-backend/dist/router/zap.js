"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const middleWare_1 = require("../middleWare");
const types_1 = require("../types");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/", middleWare_1.authMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("creating zap");
    //@ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = types_1.ZapCreateSchema.safeParse(body);
    if (!parsedData.success) {
        console.log(parsedData);
        console.log(body);
        return res.status(411).json({
            message: "Incorrect Inputs",
        });
    }
    const zapId = yield db_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const zap = yield db_1.prismaClient.zap.create({
            data: {
                userID: parseInt(id),
                triggerID: "", // how it was defined in database schema
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        actionID: x.availableActionID,
                        sortingOrder: index,
                    }))
                }
            }
        });
        const trigger = yield tx.trigger.create({
            data: {
                avialableTriggerID: parsedData.data.availableTriggerID, //need to put triggerID in trigger schema
                zapID: zap.id,
            }
        });
        yield tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerID: trigger.id,
            }
        });
        return zap.id;
    }));
    return res.json({
        zapId
    });
}));
router.get("/", middleWare_1.authMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("zap Handler");
    //getting all the zaps here
    //@ts-ignore
    const id = req.id;
    const zaps = yield db_1.prismaClient.zap.findMany({
        where: {
            userID: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({
        zaps
    });
}));
router.get("/:zapId", middleWare_1.authMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("getting a specific zap and its corresponding zap runs");
    //@ts-ignore
    //
    const zapID = req.params.zapId;
    //@ts-ignore
    const id = req.id;
    const zaps = yield db_1.prismaClient.zap.findMany({
        where: {
            id: zapID, /** 2 checks as we don't want users to get hold of other users zaps */
            userID: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({
        zaps
    });
}));
/** before testing on postman , seed some availableTriggers and availableActions in the database*/
exports.zapRouter = router;
