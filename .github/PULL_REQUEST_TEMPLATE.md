Restores package.json that was deleted in commit 140b6a307c2a71e8ef277840c2d23f613dc67b93. This version includes the exceljs dependency added earlier.

Changes:
- Re-add package.json with dependencies and devDependencies.

Reason:
- package.json is necessary for running tests and managing dependencies. It was accidentally removed and needs to be restored so CI and collaborators can run tests locally.
