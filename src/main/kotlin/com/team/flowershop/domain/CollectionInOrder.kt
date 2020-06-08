package com.team.flowershop.domain


import com.fasterxml.jackson.annotation.JsonIgnoreProperties

import javax.persistence.*

import org.springframework.data.elasticsearch.annotations.FieldType
import java.io.Serializable

/**
 * A CollectionInOrder.
 */
@Entity
@Table(name = "collection_in_order")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "collectioninorder")
data class CollectionInOrder(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @Column(name = "amount")
    var amount: Int? = null,

    @ManyToOne    @JsonIgnoreProperties("collectionInOrders")
    var collection: Collection? = null,

    @ManyToOne    @JsonIgnoreProperties("collectionInOrders")
    var packing: Packing? = null,

    @ManyToOne    @JsonIgnoreProperties("collectionInOrders")
    var order: Order? = null

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
) : Serializable {
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CollectionInOrder) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "CollectionInOrder{" +
        "id=$id" +
        ", amount=$amount" +
        "}"


    companion object {
        private const val serialVersionUID = 1L
    }
}
