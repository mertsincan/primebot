import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
        const TOKEN = core.getInput('token');
        const octokit = github.getOctokit(TOKEN);
        const context = github.context;

        const issueBody = context.payload.issue?.body || '';
        const issueNumber = context.payload.issue?.number || context.payload.pull_request?.number;
        const repo = context.repo;

        const commentBody = `Thank you ! 🙌`;

        if (issueNumber !== undefined) {
            const data = await octokit.rest.issues.get({
                ...repo,
                issue_number: issueNumber
            });
            await octokit.rest.issues.createComment({
                ...repo,
                issue_number: issueNumber,
                body: commentBody
            });

            // Milestone'ları al
            const milestones = await octokit.rest.issues.listMilestones({
                ...repo,
                state: 'open'
            });

            core.info(`PR: ${data.data.pull_request?.url}`);
        }
    } catch (error) {
        core.setFailed(`Action failed: ${(error as Error).message}`);
    }
}

run();
