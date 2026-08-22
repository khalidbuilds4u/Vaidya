"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var adapter_pg_1 = require("@prisma/adapter-pg");
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
// Load .env.local because that's where DATABASE_URL is
dotenv.config({ path: path_1.default.resolve(process.cwd(), '.env.local') });
var connectionString = process.env.DATABASE_URL;
if (!connectionString)
    throw new Error("DATABASE_URL is not set");
var adapter = new adapter_pg_1.PrismaPg({ connectionString: connectionString });
var prisma = new client_1.PrismaClient({ adapter: adapter });
var MOCK_TREATMENTS = [
    {
        slug: 'knee-replacement',
        name: 'Knee Replacement Surgery',
        specialty: 'Orthopedics',
        minEstimate: 4500,
        maxEstimate: 6500,
        recoveryTime: '2-3 Weeks',
        description: 'A minimally invasive surgical procedure to replace damaged cartilage and bone with high-durability prosthetic implants.',
    },
    {
        slug: 'coronary-artery-bypass',
        name: 'Coronary Artery Bypass Grafting (CABG)',
        specialty: 'Cardiology',
        minEstimate: 5500,
        maxEstimate: 8000,
        recoveryTime: '4-6 Weeks',
        description: 'Advanced beating-heart and robotic surgical bypass improving coronary blood flow with high long-term success rates.',
    },
    {
        slug: 'brain-tumor-surgery',
        name: 'Brain Tumor Surgery & Radiosurgery',
        specialty: 'Neurology',
        minEstimate: 6000,
        maxEstimate: 9500,
        recoveryTime: '4-8 Weeks',
        description: 'Cutting-edge intraoperative MRI and CyberKnife robotic radiosurgery to precisely excise abnormal cranial lesions.',
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, MOCK_TREATMENTS_1, t, specialtySlug, specialty, treatment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Starting seed...');
                    _i = 0, MOCK_TREATMENTS_1 = MOCK_TREATMENTS;
                    _a.label = 1;
                case 1:
                    if (!(_i < MOCK_TREATMENTS_1.length)) return [3 /*break*/, 7];
                    t = MOCK_TREATMENTS_1[_i];
                    specialtySlug = t.specialty.toLowerCase().replace(/\s+/g, '-');
                    return [4 /*yield*/, prisma.specialty.findUnique({
                            where: { slug: specialtySlug }
                        })];
                case 2:
                    specialty = _a.sent();
                    if (!!specialty) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.specialty.create({
                            data: {
                                name: t.specialty,
                                slug: specialtySlug,
                                description: "Specialized care in ".concat(t.specialty)
                            }
                        })];
                case 3:
                    specialty = _a.sent();
                    console.log("Created specialty: ".concat(t.specialty));
                    _a.label = 4;
                case 4: return [4 /*yield*/, prisma.treatment.upsert({
                        where: { slug: t.slug },
                        update: {
                            name: t.name,
                            description: t.description,
                            minEstimate: t.minEstimate,
                            maxEstimate: t.maxEstimate,
                            recovery: t.recoveryTime,
                            specialtyId: specialty.id,
                        },
                        create: {
                            slug: t.slug,
                            name: t.name,
                            description: t.description,
                            minEstimate: t.minEstimate,
                            maxEstimate: t.maxEstimate,
                            recovery: t.recoveryTime,
                            specialtyId: specialty.id,
                        }
                    })];
                case 5:
                    treatment = _a.sent();
                    console.log("Upserted treatment: ".concat(treatment.name));
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7:
                    console.log('Seed completed successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
