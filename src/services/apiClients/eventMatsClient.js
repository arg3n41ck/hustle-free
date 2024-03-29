import $api from '../axios'

export class EventMatsClient {
  async getEventDays(params) {
    try {
      return await $api.get(`/mats/event_days/`, { params })
    } catch (error) {
      throw error
    }
  }

  async createMat(body) {
    try {
      return await $api.post(`/mats/event_day_mats/`, body)
    } catch (error) {
      throw error
    }
  }

  async createDay(body) {
    try {
      return await $api.post(`/mats/event_days/`, body)
    } catch (error) {
      throw error
    }
  }

  async editDay(id, body) {
    try {
      return await $api.patch(`/mats/event_days/${id}/`, body)
    } catch (error) {
      throw error
    }
  }

  async editMat(id, body) {
    try {
      return await $api.patch(`/mats/event_day_mats/${id}/`, body)
    } catch (error) {
      throw error
    }
  }

  async deleteDay(id) {
    try {
      return await $api.delete(`/mats/event_days/${id}/`)
    } catch (error) {
      throw error
    }
  }

  async deleteMat(id) {
    try {
      return await $api.delete(`/mats/event_day_mats/${id}/`)
    } catch (error) {
      throw error
    }
  }

  async getCurrentFightings(params) {
    try {
      return await $api.get(`/mats/current_day_fights/`, { params })
    } catch (error) {
      throw error
    }
  }

  async changeBracketOrderMat(bracketId, body) {
    try {
      return await $api.patch(`/brackets/brackets/${bracketId}/change_bracket_order_mat/`, body)
    } catch (error) {
      throw error
    }
  }

  async getMatDetails(matId) {
    try {
      return await $api.get(`/mats/mat_detail/${matId}/`, {
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

  async getMatBracketDetails(bracketId) {
    try {
      return await $api.get(`/mats/bracket_detail/${bracketId}/`, {
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
}
