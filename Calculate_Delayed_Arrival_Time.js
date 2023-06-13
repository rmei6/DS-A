/*
 * Complete the 'findDelayedArrivalTime' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER arrivalTime
 *  2. INTEGER delayedTime
 */

function findDelayedArrivalTime(arrivalTime, delayedTime) {
  return (arrivalTime + delayedTime) % 24
}
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const arrivalTime = parseInt(readLine().trim(), 10);

  const delayedTime = parseInt(readLine().trim(), 10);

  const result = findDelayedArrivalTime(arrivalTime, delayedTime);

  ws.write(result + '\n');

  ws.end();
}
