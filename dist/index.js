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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const TOKEN = core.getInput('token');
            const octokit = github.getOctokit(TOKEN);
            const context = github.context;
            const issueBody = ((_a = context.payload.issue) === null || _a === void 0 ? void 0 : _a.body) || '';
            const issueNumber = ((_b = context.payload.issue) === null || _b === void 0 ? void 0 : _b.number) || ((_c = context.payload.pull_request) === null || _c === void 0 ? void 0 : _c.number);
            const repo = context.repo;
            const commentBody = `Thank you ! 🙌`;
            if (issueNumber !== undefined) {
                yield octokit.rest.issues.createComment(Object.assign(Object.assign({}, repo), { issue_number: issueNumber, body: commentBody }));
            }
            /*if (missingSections.length > 0) {
                // Eksik alanlar varsa kullanıcıyı bilgilendiren bir yorum ekle
                const commentBody = `⚠️ The following sections are missing or incomplete in your issue:\n\n- ${missingSections.join('\n- ')}\n\nPlease update the issue to follow the required template. Thank you! 🙌`;
    
                await octokit.rest.issues.createComment({
                    ...repo,
                    issue_number: issueNumber,
                    body: commentBody
                });
    
                core.info('Comment added for missing template sections.');
            } else {
                core.info('Issue follows the template.');
            }*/
        }
        catch (error) {
            core.setFailed(`Action failed: ${error.message}`);
        }
    });
}
run();
