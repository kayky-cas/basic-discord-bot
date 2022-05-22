import cluster, { Worker } from 'cluster';
import { main } from '../main';
import { DebugService } from '../services/debug.service';

export class Cluster {
  private static isPrimary(): boolean {
    return cluster.isPrimary;
  }

  private static exitWorkerCall = (worker: Worker) => {
    worker.kill();
    if (worker.process.exitCode != 0 && !worker.exitedAfterDisconnect) {
      DebugService.error(
        `Worker ${worker.process.pid} exited with code ${worker.process.exitCode}`
      );
      cluster.fork();
    } else {
      DebugService.info(`Worker ${worker.process.pid} exited`);
    }
  };

  private static onlineWorkerCall = (worker: Worker) => {
    DebugService.info(`Worker ${worker.process.pid} online`);
  };

  static run(): void {
    if (Cluster.isPrimary()) {
      DebugService.info(`Primary ${process.pid} is running`);

      cluster.fork();

      cluster.on('online', Cluster.onlineWorkerCall);
      cluster.on('exit', Cluster.exitWorkerCall);
    } else {
      main();
    }
  }
}
