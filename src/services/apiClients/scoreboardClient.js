import $api from '../axios'

export class ScoreboardClient {
  async scoreboard(scoreboardId, params) {
    try {
      return await $api.get(`/scoreboards/scoreboard/${scoreboardId}/`, {
        params,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
    } catch (error) {
      throw error
    }
  }

  async createScoreboard(body) {
    try {
      return await $api.post(`/scoreboards/scoreboard/`, body)
    } catch (error) {
      throw error
    }
  }

  async changeScores(fighterId, body) {
    try {
      return await $api.patch(`/scoreboards/scoreboard_fighters/${fighterId}/change_scores/`, body)
    } catch (error) {
      throw error
    }
  }

  async submitWinType(fighterId, body) {
    try {
      return await $api.patch(
        `/scoreboards/scoreboard_fighters/${fighterId}/submit_win_type/`,
        body,
      )
    } catch (error) {
      throw error
    }
  }

  async submissions(params) {
    try {
      return await $api.get(`/scoreboards/submissions/`, { params })
    } catch (error) {
      throw error
    }
  }

  async handleEvent(scoreboardId, body) {
    try {
      return await $api.post(`/scoreboards/scoreboard/${scoreboardId}/handle_event/`, body)
    } catch (error) {
      throw error
    }
  }

  async saveRoundEndTime(scoreboardId, body) {
    try {
      return await $api.post(`/scoreboards/scoreboard/${scoreboardId}/scoreboard_fight_time/`, body)
    } catch (error) {
      throw error
    }
  }
}
