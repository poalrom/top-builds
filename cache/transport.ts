import axios from 'axios';
import axiosRateLimit, { RateLimitedAxiosInstance, rateLimitOptions } from 'axios-rate-limit';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';
import { withDefaultConfig } from './utils/withDefaultConfig';

interface ITransportConfig {
    retries: IAxiosRetryConfig,
    rateLimit: rateLimitOptions;
}

const defaultConfig: ITransportConfig = {
    retries: { retryDelay: axiosRetry.exponentialDelay, retries: 10 },
    rateLimit: { maxRPS: 2 },
}

export type ITransport = RateLimitedAxiosInstance;

export const getTransport = withDefaultConfig(defaultConfig, ({ retries, rateLimit }) => {
    const axiosInstance = axios.create();

    axiosRetry(axiosInstance, retries);

    return axiosRateLimit(axiosInstance, rateLimit);
});