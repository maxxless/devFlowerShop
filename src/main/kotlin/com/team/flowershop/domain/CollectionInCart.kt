package com.team.flowershop.domain


import com.fasterxml.jackson.annotation.JsonIgnoreProperties

import javax.persistence.*

import org.springframework.data.elasticsearch.annotations.FieldType
import java.io.Serializable

/**
 * A CollectionInCart.
 */
@Entity
@Table(name = "collection_in_cart")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "collectionincart")
data class CollectionInCart(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @Column(name = "amount")
    var amount: Int? = null,

    @ManyToOne    @JsonIgnoreProperties("collectionInCarts")
    var collection: Collection? = null,

    @ManyToOne    @JsonIgnoreProperties("collectionInCarts")
    var packing: Packing? = null,

    @ManyToOne    @JsonIgnoreProperties("collectionInCarts")
    var cart: Cart? = null

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
) : Serializable {
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is CollectionInCart) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "CollectionInCart{" +
        "id=$id" +
        ", amount=$amount" +
        "}"


    companion object {
        private const val serialVersionUID = 1L
    }
}
