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

            const projects = await octokit.rest.projects.listForRepo({
                ...repo
            });

            // Proje ID'sini bul
            const projectId = projects.data.find((p) => p.name === 'Test')?.id;
            core.info(`Project ID: ${projectId}`);
            const columns = await octokit.rest.projects.listColumns({
                project_id: projectId!
            });

            // 'v1.0.0' adlı milestone'u bul
            const milestone = milestones.data.find((m) => m.title === 'v1.0.0');

            if (milestone) {
                // Milestone'ı issue'ya ekle
                await octokit.rest.issues.update({
                    ...repo,
                    issue_number: issueNumber,
                    milestone: 'v1.0.0'
                });

                await octokit.rest.projects.createCard({
                    column_id: columns.data[0].id,
                    content_id: issueNumber,
                    content_type: 'Issue',
                    project_id: projectId
                });

                core.info(`Milestone updated to v1.0.0`);
            } else {
                core.warning('Milestone "v1.0.0" not found.');
            }

            core.info(data.data.url);
        }
    } catch (error) {
        core.setFailed(`Action failed: ${(error as Error).message}`);
    }
}

run();
