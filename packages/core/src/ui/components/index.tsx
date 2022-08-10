import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import React from "react";

import {
  FutureState,
  DeploymentState,
  ModuleState,
} from "../../deployment-state";

export const IgnitionUi = ({
  deploymentState,
}: {
  deploymentState: DeploymentState;
}) => {
  const currentModule = deploymentState.getCurrentModule();

  const successfulModules = deploymentState.getSuccessfulModules();

  return (
    <Box flexDirection="column">
      <Header deploymentState={deploymentState} />

      <Box flexDirection="column" marginLeft={2} marginTop={1}>
        <SuccessfulModules modules={successfulModules} />

        <CurrentModule module={currentModule} />
      </Box>
    </Box>
  );
};

const Header = ({ deploymentState }: { deploymentState: DeploymentState }) => {
  const successfulModulesCount = deploymentState.getSuccessfulModules().length;
  const modulesCount = deploymentState.getModules().length;

  return (
    <Box>
      <Text bold={true}>
        {successfulModulesCount} of {modulesCount} modules deployed
      </Text>
    </Box>
  );
};

const CurrentModule = ({ module }: { module?: ModuleState }) => {
  if (module === undefined) {
    return null;
  }

  const futuresStates = module.getFuturesStates();

  return (
    <Box flexDirection="column">
      <Box>
        <Text>
          <Spinner type="dots" /> Deploying {module.id}
        </Text>
      </Box>
      <Box flexDirection="column" marginLeft={4}>
        {futuresStates
          .sort((a, b) => compareFuturesStates(a[1], b[1]))
          .map(([futureId, futureState]) => (
            <Future
              key={futureId}
              futureId={futureId}
              futureState={futureState}
            />
          ))}
      </Box>
    </Box>
  );
};

function compareFuturesStates(a: FutureState, b: FutureState): number {
  const value = (s: FutureState["_kind"]) => {
    if (s === "success" || s === "failure" || s === "hold") {
      return 0;
    }
    if (s === "running") {
      return 1;
    }
    if (s === "ready") {
      return 2;
    }
    if (s === "waiting") {
      return 3;
    }
    const _exhaustiveCheck: never = s;
    return s;
  };

  const aValue = value(a._kind);
  const bValue = value(b._kind);
  return aValue - bValue;
}

const Future = ({
  futureId,
  futureState,
}: {
  futureId: string;
  futureState: FutureState;
}) => {
  return (
    <Box>
      {futureState._kind === "running" ? (
        <Text>{futureId}: Executing</Text>
      ) : futureState._kind === "success" ? (
        <Text color="green">{futureId}: Executed</Text>
      ) : futureState._kind === "ready" ? (
        <Text color="gray">{futureId}: Ready</Text>
      ) : futureState._kind === "waiting" ? (
        <Text color="gray">{futureId}: Waiting</Text>
      ) : null}
    </Box>
  );
};

const SuccessfulModules = ({ modules }: { modules: ModuleState[] }) => {
  if (modules.length === 0) {
    return null;
  }

  return (
    <Box flexDirection="column">
      {modules.map((m) => (
        <Box key={m.id}>
          <Text color="green">Deployed {m.id}</Text>
        </Box>
      ))}
    </Box>
  );
};
