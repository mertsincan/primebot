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

            core.info(data.data.url);
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
    } catch (error) {
        core.setFailed(`Action failed: ${(error as Error).message}`);
    }
}

run();
