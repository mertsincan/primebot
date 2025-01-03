const { context, getOctokit } = require('@actions/github');

const TOKEN = process.env.PERSONAL_ACCESS_TOKEN || process.env.GITHUB_TOKEN;

async function addComment(type, number, body) {
    const octokit = getOctokit(TOKEN);

    try {
        if (type === 'issue') {
            await octokit.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: number,
                body: body,
                headers: {
                    'x-github-actor': BOT_USERNAME,
                    'x-github-avatar-url': BOT_AVATAR_URL
                }
            });
        } else if (type === 'pr') {
            await octokit.rest.pulls.createReview({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: number,
                body: body,
                headers: {
                    'x-github-actor': BOT_USERNAME,
                    'x-github-avatar-url': BOT_AVATAR_URL
                }
            });
        }
    } catch (error) {
        console.error(`Failed to add comment to ${type}:`, error);
    }
}

module.exports = {
    addComment
};
