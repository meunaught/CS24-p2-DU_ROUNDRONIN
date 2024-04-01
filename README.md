## Prerequisites
Have the following ports usable, i.e., not blocked by any network firewall or not in use already.
- 3000 [frontend]
- 5000 [backend] [MacOS uses port 5000 for airdrop, take caution]
- 5432 [db]

## Development
Run the services:
```bash
docker compose up --build
```

Use [http://localhost:3000](http://localhost:3000) to access frontend.
Use [http://localhost:5000](http://localhost:5000) to access backend.

Default login credentials:
- Username: admin@cs.com
- Password: admin

## Caution
If any stage of the build fails or force stopped, make sure to remove data volume for the db
```bash
docker volume rm cs24-p2-du_roundronin_postgres-data
```
Modify the volume name accordingly by checking with
```bash
docker volume ls
```

## Notes
The repo is devcontainer compatible, you can simply open it in github codespaces and run the docker commands from there.