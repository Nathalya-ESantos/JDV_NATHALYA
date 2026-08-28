// Guardar os dados, aplicar as regras do limite e atualizar a contagem.

import { useState } from 'react';
import Board from '../Board/Board';
import GameMode from '../GameMode/GameMode';
import { calculateWinner } from '../Calculate/Calculate';
import styles from './Game.module.css';

