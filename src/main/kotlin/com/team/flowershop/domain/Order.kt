package com.team.flowershop.domain


import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties

import javax.persistence.*

import org.springframework.data.elasticsearch.annotations.FieldType
import java.io.Serializable
import java.time.Instant

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "order")
data class Order(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @Column(name = "total_price")
    var totalPrice: Double? = null,

    @Column(name = "date")
    var date: Instant? = null,

    @ManyToOne    @JsonIgnoreProperties("orders")
    var user: User? = null,

    @ManyToOne    @JsonIgnoreProperties("orders")
    var packing: Packing? = null,

    @OneToOne(mappedBy = "order")
    @JsonIgnore
    var delivery: Delivery? = null

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
) : Serializable {
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Order) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Order{" +
        "id=$id" +
        ", totalPrice=$totalPrice" +
        ", date='$date'" +
        "}"


    companion object {
        private const val serialVersionUID = 1L
    }
}
