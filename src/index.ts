import { Cluster } from './cluster/cluster';
import { EnvService } from './services/env.service';

EnvService.loadEnv();

Cluster.run();
