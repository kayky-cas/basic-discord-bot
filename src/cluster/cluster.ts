import cluster, { Worker } from 'cluster';
import { DebugService } from '../services/debug.service';
import { EnvService } from '../services/env.service';

export class Cluster {
  private static isPrimary(): boolean {
    return cluster.isPrimary;
  }

  private static exitWorkerCall = (worker: Worker) => {
    DebugService.debug(`Worker ${worker.process.pid} exited`);
    worker.kill();
  };

  private static onlineWorkerCall = (worker: Worker) => {
    DebugService.debug(`Worker ${worker.process.pid} online`);
  };

  static run(): void {
    if (Cluster.isPrimary() && EnvService.isDev()) {
      const numWorkers = require('os').cpus().length / 2;

      DebugService.debug(`Primary ${process.pid} is running`);

      for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
      }

      cluster.on('online', Cluster.onlineWorkerCall);
      cluster.on('exit', Cluster.exitWorkerCall);
    } else {
      require('../main');
    }
  }
}
