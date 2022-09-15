import * as fs from 'fs';
import fetch from 'node-fetch';
import { SequelizeStorage, Umzug } from 'umzug';
import db from './models/index.js';

let data = await (await fetch("https://backend.devxdao.com/api/shared/all-proposals-2?sort_key=proposal.id&sort_direction=desc&limit=1000")).json()
data = data.proposals
data = data.filter((i) => i.type === 'grant' && i.id !== 477)

const keysToDelete = ['has_fulfilled', 'previous_work', 'other_work', 'received_grant', 'foundational_work', 'files', 'license_other', 'relationship', 'received_grant_before', 'user_id', 'comments', 'changes', 'member_reason', 'member_benefit', 'dos_paid', 'dos_txid', 'rep', 'dos_eth_amount', 'include_membership', 'form_submitted', 'informal_vote_ready_sent', 'formal_vote_ready_sent', 'onboarding_ready_sent', 'grant_ready_sent', 'signature_request_id', 'hellosign_form', 'sponsor_code_id', 'yesNo1', 'yesNo1Exp', 'yesNo2', 'yesNo2Exp', 'yesNo3', 'yesNo3Exp', 'yesNo4', 'yesNo4Exp', 'formField1', 'formField2', 'purpose', 'purposeOther', 'signed_count', 'membership_signature_request_id', 'membership_hellosign_form', 'member_required', 'extra_notes', 'pdf', 'signature_grant_request_id', 'grant_hellosign_form', 'agree1', 'agree2', 'is_company_or_organization', 'name_entity', 'entity_country', 'have_mentor', 'name_mentor', 'total_hours_mentor', 'agree3', 'type_status', 'dos_amount', 'dos_cc_amount', 'things_delivered', 'delivered_at', 'amount_advance_detail', 'proposal_request_payment', 'proposal_request_from', 'proposal_advance_status', 'discourse_topic_id', 'topic_posts_count', 'total_user_va', 'first_name', 'last_name', 'forum_name'];

const tags = new Set();
const statuses = new Set();

for (const project of data) {
  keysToDelete.forEach((i) => delete project[i])
  try {
    if (project.tags) {
      project.tags = project.tags.split(',');
      project.tags.forEach((i) => tags.add(i))
    }
  } catch (e) {
    console.log(project.tags);
    throw e;
  }
  statuses.add(project.status)
  if (project.votes) {
    const mvotes = project.votes.filter((i) => i.content_type === 'milestone');
    for (const mvote of mvotes) {
      try {
        const index = project.milestones.findIndex((i) => i.id === mvote.milestone_id);
        project.milestones[index][mvote.type] = {
          status: mvote.status, created_at: mvote.created_at, updated_at: mvote.updated_at, result: mvote.result,
        };
      } catch (e) {
        const index = project.milestones.findIndex((i) => i.id === mvote.milestone_id);
        console.log(mvote);
        console.log(index);
        console.log(project.milestones);
        throw e;
      }
    }
    delete project.votes;
    project.milestones = JSON.stringify(project.milestones)
  }
}

const sqlTags = [{tag: "None"}]

tags.forEach((i) => sqlTags.push({tag: i}))

const sqlStatuses = []

statuses.forEach((i) => sqlStatuses.push({status: i}))

fs.writeFile('result.json', JSON.stringify(data), function(err) {
  if (err) throw err;
  console.log('complete data');
});
fs.writeFile('statuses.json', JSON.stringify(sqlStatuses), function(err) {
  if (err) throw err;
  console.log('complete statuses');
});
fs.writeFile('tags.json', JSON.stringify(sqlTags), function(err) {
  if (err) throw err;
  console.log('complete tags');
});


const sequelize = db.sequelize

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migration_meta',
  }),
  logger: console,
});

const seeders = new Umzug({
  migrations: { glob: 'seeders/*.js' },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta',
  }),
  logger: console,
});

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.down({to: 0});
  await umzug.up();
  await seeders.down({to: 0});
  await seeders.up();
})();
