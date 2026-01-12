import { Config, getConfig } from '@codemask-labs/node-config';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsString } from 'class-validator';

enum Env {
    LOCAL = 'LOCAL',
    DOCKER = 'DOCKER',
}

@Config()
class AppConfig {
    @IsEnum(Env)
    ENV!: Env;

    @IsString()
    SERVER_URL!: string;

    @Type(() => Number)
    @IsInt()
    SERVER_PORT!: number;

    @IsString()
    CLIENT_URL!: string;

    @Type(() => Number)
    @IsInt()
    CLIENT_PORT!: number;
}

export const APP_CONFIG = getConfig(AppConfig);
