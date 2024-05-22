import core from '@actions/core'
import github from '@actions/github'

function validateBody(body) {
  return !body.split("\n").some(l => l.startsWith('- [ ]'));
}

async function run() {
  const { body } = github.context.payload.pull_request;
  if (validateBody(body)) {
    core.setOutput('result', '✅ Pull Request tasks incomplete');
  } else {
    core.setFailed('❌ Pull Request contains incomplete tasks');
  }
}

run();
