'use client'

import { useMutation } from '@tanstack/vue-query'
import type {
  Config,
  ResolvedRegister,
  SwitchChainErrorType,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter, MaybeRefDeep } from '../types.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSwitchChainParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  MaybeRefDeep<ConfigParameter<config>> & {
    mutation?:
      | UseMutationParameters<
          SwitchChainData<config, config['chains'][number]['id']>,
          SwitchChainErrorType,
          SwitchChainVariables<config, config['chains'][number]['id']>,
          context
        >
      | undefined
  }
>

export type UseSwitchChainReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationReturnType<
    SwitchChainData<config, config['chains'][number]['id']>,
    SwitchChainErrorType,
    SwitchChainVariables<config, config['chains'][number]['id']>,
    context
  > & {
    chains: config['chains']
    switchChain: SwitchChainMutate<config, context>
    switchChainAsync: SwitchChainMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSwitchChain */
export function useSwitchChain<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchChainParameters<config, context> = {},
): UseSwitchChainReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = switchChainMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    chains: config.chains,
    switchChain: mutate,
    switchChainAsync: mutateAsync,
  } as UseSwitchChainReturnType<config, context>
}
